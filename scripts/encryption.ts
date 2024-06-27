import * as encryption from '../server/services/encryption';

async function main() {
  const credentials = {
    userId: 'userId',
    userToken: 'userToken',
  };

  try {
    await encryption.register(credentials);

    const key = await encryption.getEncryptionKey({
      userId: credentials.userId,
      userToken: 'userToken',
    });

    if (key) {
      const encryptedData = encryption.encrypt(
        JSON.stringify({ a: 'a', b: [1, 2, 3] }),
        key,
        'utf-8',
      );

      const decryptedData = encryption.decrypt(encryptedData, key, 'utf-8');
      console.log(decryptedData);
    }
  } catch (e) {
    console.error(e);
  }
}

(async () => await main())();
