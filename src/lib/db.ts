import {
  defaultContact,
  persistedStateSchema,
  type PersistedState,
} from './types';

const LOCAL_STORAGE_KEY = 'price-offer-data';

export function saveState(update: Partial<PersistedState>) {
  const currentState = loadState({
    contact: defaultContact,
    partners: [],
  });

  window.localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({ ...currentState, ...update }),
  );
}

export function loadState(fallBackState: PersistedState) {
  const persisted = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  const validated = persistedStateSchema.safeParse(
    JSON.parse(persisted ?? '{}'),
  );

  if (validated.success) {
    return validated.data;
  }

  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fallBackState));
  return fallBackState;
}
