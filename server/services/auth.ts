import jwt from '@tsndr/cloudflare-worker-jwt';
import { createClerkClient } from '@clerk/backend';

export type PrivateMetadata = {
  pinHash: string;
};

export type UserContext = {
  isAuthenticated: boolean;
  userId?: string;
  metadata?: PrivateMetadata;
};

export async function authorizeRequest(
  sessionToken: string | undefined | null,
  publicKey: string,
): Promise<UserContext> {
  if (!sessionToken) {
    return { isAuthenticated: false };
  }

  try {
    const isValid = await jwt.verify(
      sessionToken ?? '',
      publicKey.replace(/\\n/g, '\n'),
      {
        algorithm: 'RS256',
      },
    );

    if (isValid) {
      const jwtToken = jwt.decode(sessionToken);
      const metadata = await getPrivateMetadata(jwtToken.payload?.sub!);

      return {
        isAuthenticated: true,
        userId: jwtToken.payload?.sub,
        metadata,
      };
    }
    return { isAuthenticated: false };
  } catch (e) {
    console.error(e);
    return { isAuthenticated: false };
  }
}

export async function getPrivateMetadata(userId: string) {
  const clerk = createClerkClient({ secretKey: process.env.CLERK_API_KEY! });
  const user = await clerk.users.getUser(userId);
  return user?.privateMetadata as PrivateMetadata;
}

export async function setPrivateMetadata(
  userId: string,
  data: PrivateMetadata,
) {
  const clerk = createClerkClient({ secretKey: process.env.CLERK_API_KEY! });
  await clerk.users.updateUser(userId, {
    privateMetadata: data,
  });
}
