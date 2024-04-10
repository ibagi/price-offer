import jwt from '@tsndr/cloudflare-worker-jwt';

export async function authorizeRequest(
  sessionToken: string | undefined | null,
  publicKey: string,
) {
  if (!sessionToken) {
    return false;
  }

  try {
    const _ = await jwt.verify(
      sessionToken ?? '',
      publicKey.replace(/\\n/g, '\n'),
      {
        algorithm: 'RS256',
      },
    );
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
