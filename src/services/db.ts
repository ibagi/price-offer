import localforage from 'localforage';
import type { ZodType } from 'zod';

const db = localforage.createInstance({
  driver: localforage.INDEXEDDB,
  name: 'price-offer',
});

export type LoadFailed = {
  success: false;
};

export type Loaded<T> = {
  data: T;
  success: true;
};

export async function getKeys(pattern: string) {
  const keys: string[] = [];
  const regex = new RegExp(pattern);

  await db.iterate((_, key) => {
    if (key.match(regex)) {
      keys.push(key);
    }
  });

  return keys;
}

export async function loadData<T>(
  key: string,
  schema: ZodType<T>,
  defaultValue: T,
) {
  const persisted = await db.getItem<T>(key);
  const validated = schema.safeParse(persisted);

  if (validated.success) {
    return validated.data;
  }

  await db.setItem(key, defaultValue);
  return defaultValue;
}

export async function tryLoadData<T>(
  key: string,
  schema: ZodType<T>,
): Promise<LoadFailed | Loaded<T>> {
  const persisted = await db.getItem<T>(key);
  const validated = schema.safeParse(persisted);

  if (validated.success) {
    return { data: validated.data, success: true };
  }

  return { success: false };
}

export async function saveData<T>(key: string, data: T) {
  await db.setItem(key, data);
}

export async function removeData(key: string) {
  await db.removeItem(key);
}

export async function exportData() {
  const keys = await getKeys('.*');
  const result: Record<string, any> = {};
  for (const key of keys) {
    const data = await db.getItem(key);
    result[key] = data;
  }

  const exportData = new Blob([JSON.stringify(result, null, 2)], {
    type: 'application/json',
  });
  const url = window.URL.createObjectURL(exportData);

  const link = document.createElement('a');
  link.setAttribute('download', `price-offer.json`);
  link.href = url;
  link.click();
}
