import { ContactState } from './contact';
import { PartnerState } from './partner';
import { getPartners } from '../services/partner';
import { getContact } from '../services/contact';
import { OfferState } from './offer';
import { defaultContact } from '../../server/types';

export let contactState = new ContactState({ ...defaultContact });
export let partnerState = new PartnerState([]);

export async function restoreState() {
  return Promise.all([
    getPartners().then((partners) => {
      partnerState = new PartnerState(partners);
    }),
    getContact().then((contact) => {
      contactState = new ContactState(contact);
    }),
  ]);
}

export { OfferState };
