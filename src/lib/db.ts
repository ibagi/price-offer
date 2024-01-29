import { defaultContact, type PersistedState } from './types';

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
  const existingData = window.localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!existingData) {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(fallBackState),
    );
    return fallBackState;
  }

  return JSON.parse(existingData) as PersistedState;
}
