import type { Contact } from '../lib/types';
import { State } from '../lib/state';

export class ContactState extends State<Contact> {
  get contact() {
    return this.state;
  }

  constructor(from: Contact) {
    super({ initialState: from });
  }
}
