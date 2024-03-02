import * as db from './db';
import { defaultContact, defaultOffer } from './types';

import { createOfferStore } from '../stores/offer';
import { createPartnerStore } from '../stores/partner';
import { createContactStore } from '../stores/contact';

export const contactStore = createContactStore({...defaultContact});
export const partnerStore = createPartnerStore([]);
export const offerStore = createOfferStore({ ...defaultOffer }, []);

export function restoreState() {
  const persistedState = db.loadState({
    contact: defaultContact,
    partners: [],
  });

  partnerStore.partners.set(persistedState.partners ?? []);
  contactStore.contact.set(persistedState.contact);
}
