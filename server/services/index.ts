import type { Database } from '../db';
import * as authService from './auth';

import { ContactService } from './contact';
import { EncryptionService } from './encryption';
import { OfferService } from './offer';
import { PartnerService } from './partner';

export function initializeServices(db: Database) {
  return {
    auth: authService,
    encryption: new EncryptionService(db),
    contact: new ContactService(db),
    offer: new OfferService(db),
    partner: new PartnerService(db),
  };
}
