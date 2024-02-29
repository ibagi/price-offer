import Clerk from '@clerk/clerk-js';
import type { UserResource } from '@clerk/types';
import { writable } from 'svelte/store';

import { localization } from './translations.clerk';

type User = UserResource | null | undefined;

const clerk = new Clerk(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

export const user = writable<User>(null);

export async function loadSession() {
  await clerk.load({ 
    localization: localization.hu,
    signUpUrl: ''
  });
  user.set(clerk.user);
}

export async function signIn() {
  if (!clerk.user) {
    clerk.openSignIn({
      appearance: {
        elements: {
          footer: {
            display: 'none',
          },
        },
      },
    });
  }
}

export async function signOut() {
  if (user) {
    await clerk.signOut();
    user.set(clerk.user);
  }
}

export function mountUserButton(el :HTMLDivElement) {
  clerk.mountUserButton(el);
}