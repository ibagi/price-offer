const OfferNotFound = 'offer_not_found';
const InvalidOfferNumber = 'invalid_offer_number';
const OfferNumberAlreadyExists = 'offer_number_already_exists';

export const errors = {
  OfferNotFound,
  InvalidOfferNumber,
  OfferNumberAlreadyExists,
};

export class ValidationError extends Error {
  constructor(id: string) {
    super(id);
  }
}
