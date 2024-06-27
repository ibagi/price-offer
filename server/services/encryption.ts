import crypto from 'node:crypto';
import bcrypt from 'bcrypt';

type EncryptionKeyRecord = {
  userId: string;
  salt: string;
  encryptedKey: string;
};

type EncryptionCredentials = {
  userId: string;
  userToken: string;
};

type BuiltInError = {
  code: string;
};

const encryptionKeys: EncryptionKeyRecord[] = [];

export async function register(request: EncryptionCredentials) {
  const salt = await bcrypt.genSalt();
  const derivedKey = await createDerivedKey(request.userToken, salt);

  const encryptionKey = crypto.randomBytes(16).toString('hex');
  const encryptedKey = encrypt(encryptionKey, derivedKey, 'hex');

  encryptionKeys.push({
    userId: request.userId,
    salt,
    encryptedKey,
  });
}

export async function getEncryptionKey(request: EncryptionCredentials) {
  const encryptionRecord = encryptionKeys.find(
    (k) => k.userId === request.userId,
  );

  if (!encryptionRecord) {
    throw new Error('User not found!');
  }

  try {
    const derivedKey = await createDerivedKey(
      request.userToken,
      encryptionRecord.salt,
    );

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
