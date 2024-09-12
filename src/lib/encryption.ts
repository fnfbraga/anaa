import { randomBytes, createHash, createCipheriv, createDecipheriv } from 'node:crypto';
import { googleClientSecret } from '$lib/config';

export const iv = randomBytes(16);
const key = createHash('sha256').update(String(googleClientSecret)).digest('base64').substr(0, 32); // Ensure key is 32 bytes

const algorithm = 'aes-256-ctr';

interface EncryptedFile {
	iv: Buffer;
	encryptedData: string;
}

export function encrypt(text: string) {
	const cipher = createCipheriv(algorithm, Buffer.from(key), iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return {
		iv: iv.toString('hex'),
		encryptedData: encrypted.toString('hex')
	};
}

export function decrypt(hash: EncryptedFile) {
	const decipher = createDecipheriv(algorithm, key, Buffer.from(hash.iv as any, 'hex'));
	const decrypted = Buffer.concat([
		decipher.update(Buffer.from(hash.encryptedData, 'hex')),
		decipher.final()
	]);

	return decrypted.toString();
}
