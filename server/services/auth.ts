import jwt from '@tsndr/cloudflare-worker-jwt';

export function authorizeRequest(
  sessionToken: string | undefined | null,
  publicKey: string,
) {
  try {
    const _ = jwt.verify(sessionToken ?? '', publicKey.replace(/\\n/g, '\n'), {
      algorithm: 'RS256',
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
