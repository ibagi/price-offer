import jwt from 'jsonwebtoken';

export function authorizeRequest(headers: Headers) {
  if (!headers.has('authorization')) {
    return false;
  }

  const headerParts = headers.get('authorization')?.split(' ');
  if (headerParts?.length !== 2) {
    return false;
  }

  try {
    const token = headerParts[0];
    const _ = jwt.verify(token, process.env.CLERK_PEM_PUBLIC_KEY!);
    return true;
  } catch {
    return false;
  }
}
