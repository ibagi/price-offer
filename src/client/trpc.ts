import superjson from 'superjson';
import type { AppRouter } from '../../server/router';
import { createTRPCClient, httpBatchLink } from '@trpc/client';

export const ApiCallDebounceMilis = 1500;

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_API_URL,
      transformer: superjson,
      async headers() {
        return {
          authorization: getCookieValue('__session'),
        };
      },
    }),
  ],
});

function getCookieValue(key: string) {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${key}=`))
    ?.split('=')[1];
}
