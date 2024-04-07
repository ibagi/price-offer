import superjson from 'superjson';
import type { AppRouter } from '../../server/router';
import { createTRPCClient, httpBatchLink } from '@trpc/client';

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${window.location.protocol}//${window.location.host}/api/trpc`,
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
