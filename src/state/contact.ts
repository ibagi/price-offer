import { writable, type Writable } from 'svelte/store';
import { type Contact } from '../lib/types';

export class ContactState {
  contact: Writable<Contact>;

  constructor(from: Contact) {
    this.contact = writable<Contact>(from);
  }
}
