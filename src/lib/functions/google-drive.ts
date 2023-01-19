import { googleClientSecret } from '$lib/config';
import crypto from 'crypto';
import googleDrive from '$lib/services/google-drive';
import { file } from 'googleapis/build/src/apis/file';

const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);

interface EncryptedFile {
	iv: string;
	encryptedData: string;
}

const key = crypto
	.createHash('sha256')
	.update(googleClientSecret)
	.digest('base64')
	.substring(0, 32);

function encrypt(text: string) {
	const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(file: EncryptedFile) {
	const iv = Buffer.from(file.iv, 'hex');
	const encryptedText = Buffer.from(file.encryptedData, 'hex');
	const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
}

export const createSourceFile = async (parentFolderId: string) => {
	const files = googleDrive.files;
	try {
		const res = await files.create({
			media: {
				mimeType: 'application/db',
				body: JSON.stringify(encrypt(JSON.stringify([])))
			},
			fields: 'id, name',
			requestBody: {
				name: 'anaa',
				parents: [parentFolderId]
			}
		});
		return res.data.id;
	} catch (error) {
		console.error(error);
	}
};

export const getSourcedFile = async (fileId: string) => {
	try {
		const file = await googleDrive.files.get({ fileId, alt: 'media' });
		return decrypt(file.data as any);
	} catch (error) {
		console.error(error);
	}
};

export const deleteSourceFile = async (fileId: string) => {
	try {
		const files = googleDrive.files;
		await files.delete({
			fileId,
			fields: 'name'
		});
		return fileId;
	} catch (error) {
		console.error(error);
	}
};
