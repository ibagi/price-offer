import * as db from './db';
import { defaultContact, defaultOffer } from './types';

import { ContactStore } from '../stores/contact';
import { PartnerStore } from '../stores/partner';
import { OfferStore } from '../stores/offer';

export const contactStore = new ContactStore({ ...defaultContact });
export const partnerStore = new PartnerStore([]);
export const offerStore = new OfferStore({ ...defaultOffer }, []);

export function restoreState() {
  const persistedState = db.loadState({
    contact: defaultContact,
    partners: [],
  });

  partnerStore.partners.set(persistedState.partners ?? []);
  contactStore.contact.set(persistedState.contact);
}
