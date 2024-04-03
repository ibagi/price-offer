import type { Database } from '../db';

import { ContactService } from './contact';
import { OfferService } from './offer';
import { PartnerService } from './partner';

export function initializeServices(db: Database) {
  return {
    contact: new ContactService(db),
    offer: new OfferService(db),
    partner: new PartnerService(db),
  };
}
