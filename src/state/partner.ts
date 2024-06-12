import { nanoid } from 'nanoid';
import { derived, type Readable } from 'svelte/store';
import { defaultPartner, type Offer, type Partner } from '../lib/types';
import { State } from '../lib/state';

export class PartnerState extends State<Partner[]> {
  get partners() {
    return this.state;
  }

  constructor(from: Partner[]) {
    super({ initialState: from });
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
