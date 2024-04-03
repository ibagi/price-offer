import { nanoid } from 'nanoid';
import { derived, writable, type Readable, type Writable } from 'svelte/store';
import { defaultPartner, type Offer, type Partner } from '../../server/types';

export class PartnerState {
  partners: Writable<Partner[]>;

  constructor(from: Partner[]) {
    this.partners = writable<Partner[]>(from);
  }

  addPartner = () => {
    const newPartner = { ...defaultPartner, id: nanoid() };
    this.partners.update(($partners) =>
      [...$partners, newPartner].toSorted((a, b) =>
        a.name.localeCompare(b.name),
      ),
    );
  };

  removePartner = (partner: Partner) => {
    this.partners.update(($partners) => $partners.filter((p) => p !== partner));
  };

  selectBy(offer: Readable<Offer>) {
    return derived([offer, this.partners], ([$offer, $partners]) =>
      ($partners ?? []).find((p) => p.id === $offer.partnerId),
    );
  }
}
