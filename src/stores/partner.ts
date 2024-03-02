import { writable } from 'svelte/store';
import { defaultPartner, type Partner } from '../lib/types';

export function createPartnerStore(from: Partner[]) {
  const partners = writable<Partner[]>(from);
  const selectedPartner = writable<Partner | undefined>();

  function addPartner() {
    partners.update(($partners) =>
      [...$partners, { ...defaultPartner }].toSorted((a, b) =>
        a.name.localeCompare(b.name),
      ),
    );
  }

  function removePartner(partner: Partner) {
    partners.update(($partners) => $partners.filter((p) => p !== partner));
  }

  return {
    partners,
    selectedPartner,
    addPartner,
    removePartner,
  };
}
