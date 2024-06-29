import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import type { Database } from '../db';
import { encryptionKeys } from '../db/schema';
import { eq } from 'drizzle-orm';

type EncryptionCredentials = {
  userId: string;
  pin: string;
};

type BuiltInError = {
  code: string;
};

function createDerivedKey(userToken: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(userToken, salt, 100000, 16, 'sha512', (err, derivedKey) => {
      if (err) {
        reject(err);
      }
      resolve(derivedKey.toString('hex'));
    });
  });
}

export function encrypt(data: string, key: string, encoding: crypto.Encoding) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);

  let encryptedData = cipher.update(data, encoding, 'hex');
  encryptedData += cipher.final('hex');
  return `${iv.toString('hex')}:${encryptedData}`;
}

export function decrypt(
  encryptedData: string,
  key: string,
  encoding: crypto.Encoding,
) {
  const parts = encryptedData.split(':');
  if (parts.length !== 2) {
    throw new Error('Invalid encrypted text format');
  }

  const iv = Buffer.from(parts[0], 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);

  let decryptedData = decipher.update(parts[1], 'hex', encoding);
  decryptedData += decipher.final(encoding);

  return decryptedData;
}

export class EncryptionService {
  constructor(private readonly db: Database) {}

  async register(request: EncryptionCredentials) {
    const salt = await bcrypt.genSalt();
    const pinHash = await bcrypt.hash(request.pin, salt);
    const derivedKey = await createDerivedKey(pinHash, salt);

    const encryptionKey = crypto.randomBytes(16).toString('hex');
    const encryptedKey = encrypt(encryptionKey, derivedKey, 'hex');

    await this.db.insert(encryptionKeys).values({
      userId: request.userId,
      salt: salt,
      encryptedKey: encryptedKey,
    });

    return pinHash;
  }

  async getEncryptionKey(request: EncryptionCredentials) {
    const encryptionRecord = await this.db.query.encryptionKeys.findFirst({
      where: eq(encryptionKeys.userId, request.userId),
    });

    if (!encryptionRecord) {
      throw new Error('User not found!');
    }

    try {
      const pinHash = await bcrypt.hash(request.pin, encryptionRecord.salt);
      const derivedKey = await createDerivedKey(pinHash, encryptionRecord.salt);

      const encryptionKey = decrypt(
        encryptionRecord.encryptedKey,
        derivedKey,
        'hex',
      );

      return encryptionKey;
    } catch (e) {
      if ((e as BuiltInError).code === 'ERR_OSSL_BAD_DECRYPT') {
        throw new Error('Invalid user token!');
      }
    }
  }
}
