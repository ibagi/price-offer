import jwt from 'jsonwebtoken';

export function authorizeRequest(
  sessionToken: string | undefined | null,
  publicKey: string,
) {
  try {
    const _ = jwt.verify(sessionToken ?? '', publicKey.replace(/\\n/g, '\n'), {
      algorithms: ['RS256'],
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
