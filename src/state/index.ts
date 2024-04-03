import { ContactState } from './contact';
import { PartnerState } from './partner';
import { getPartners } from '../services/partner';
import { getContact } from '../services/contact';
import { OfferState } from './offer';
import { defaultContact } from '../../server/types';

export const contactState = new ContactState({ ...defaultContact });
export const partnerState = new PartnerState([]);

export async function restoreState() {
  return Promise.all([
    getPartners().then(partnerState.partners.set),
    getContact().then(contactState.contact.set),
  ]);
}

export { OfferState };
