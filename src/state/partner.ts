import { writable, type Writable } from 'svelte/store';
import { defaultPartner, type Partner } from '../lib/types';

export class PartnerState {
  partners: Writable<Partner[]>;
  selectedPartner: Writable<Partner | undefined>;

  constructor(from: Partner[]) {
    this.partners = writable<Partner[]>(from);
    this.selectedPartner = writable<Partner | undefined>();
  }

  addPartner = () => {
    this.partners.update(($partners) =>
      [...$partners, { ...defaultPartner }].toSorted((a, b) =>
        a.name.localeCompare(b.name),
      ),
    );
  };

  removePartner = (partner: Partner) => {
    this.partners.update(($partners) => $partners.filter((p) => p !== partner));
  };
}
