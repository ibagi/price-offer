import type { AppRouter } from '../../server/router';
import { createTRPCClient, httpBatchLink } from '@trpc/client';

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_API_URL,
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
