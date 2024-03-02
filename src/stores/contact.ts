import { writable } from "svelte/store";
import { type Contact } from "../lib/types";

export function createContactStore(from: Contact) {
    const contact = writable<Contact>(from);
    return {
        contact
    }
}