import jwt from 'jsonwebtoken';

export function authorizeRequest(sessionToken: string | undefined | null) {
  const publicKey = process.env.CLERK_PEM_PUBLIC_KEY!.replace(/\\n/g, '\n');

  try {
    const _ = jwt.verify(sessionToken ?? '', publicKey, {
      algorithms: ['RS256'],
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
