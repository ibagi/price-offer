import { defaultContact } from '../lib/types';

import { ContactState } from './contact';
import { PartnerState } from './partner';
import { getPartners } from '../data/partner';
import { getContact } from '../data/contact';
import { OfferState } from './offer';

export const contactState = new ContactState({ ...defaultContact });
export const partnerState = new PartnerState([]);

export async function restoreState() {
  return Promise.all([
    getPartners().then(partnerState.partners.set),
    getContact().then(contactState.contact.set),
  ]);
}

export { OfferState };
