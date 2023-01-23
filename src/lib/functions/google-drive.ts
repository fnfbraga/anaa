import { googleClientSecret } from '$lib/config';
import crypto from 'crypto';
import googleDrive from '$lib/services/google-drive';

const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);

interface EncryptedFile {
	iv: string;
	encryptedData: string;
}
const fileName = 'anaa';

const key = crypto
	.createHash('sha256')
	.update(googleClientSecret)
	.digest('base64')
	.substring(0, 32);

function encrypt(text: string) {
	const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return {
		iv: iv.toString('hex'),
		encryptedData: encrypted.toString('hex')
	};
}

function decrypt(file: EncryptedFile) {
	const iv = Buffer.from(file.iv, 'hex');
	const encryptedText = Buffer.from(file.encryptedData, 'hex');
	const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
}

export const createSourceFile = async (parentFolderId: string, user: any) => {
	try {
		const res = await googleDrive.files.create({
			media: {
				mimeType: 'application/db',
				body: JSON.stringify(encrypt(JSON.stringify([{ url: 'test' }])))
			},
			fields: 'id, name',
			requestBody: {
				name: fileName,
				parents: [parentFolderId],
				owners: user
			}
		});
		return res.data.id;
	} catch (error) {
		console.error(error);
	}
};

export const getSourcedFileById = async (fileId: string) => {
	try {
		const file = await googleDrive.files.get({ fileId, alt: 'media' });
		return decrypt(file.data as any);
	} catch (error) {
		console.error(error);
	}
};

export const getSourcedFileId = async () => {
	try {
		const files = await googleDrive.files.list({});
		return files.data.files?.find((file) => file.name === fileName)?.id;
	} catch (error) {
		console.error(error);
	}
};

export const deleteSourceFileById = async (fileId: string) => {
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

export const deleteSourceFile = async (userEmail: string) => {
	const userFile = await getUserFile(userEmail || '');
	await deleteSourceFileById(userFile?.id || '');
};

export const getUserFile = async (userEmail: string) => {
	try {
		const driveFiles = await googleDrive.files.list({});
		if (!driveFiles?.data?.files) return null;
		const files = driveFiles.data.files.filter((file) => file.mimeType === 'application/db');
		const userFiles = [];
		for await (const file of files) {
			const fileId = file.name === fileName ? file.id : null;
			if (!fileId) return null;
			const permissionsListResponse = await googleDrive.permissions.list({ fileId });
			if (!permissionsListResponse.data.permissions) return null;
			for await (const permission of permissionsListResponse.data.permissions) {
				const permissions = await googleDrive.permissions.get({
					permissionId: permission.id || '',
					fileId: file.id || '',
					fields: '*'
				});
				if (permissions.data.emailAddress === userEmail) {
					const parentFile = (await googleDrive.files.list()).data.files?.find(
						(file) => file.id === fileId
					);
					parentFile && userFiles.push(parentFile);
				}
			}
		}
		const userFile = userFiles.filter(Boolean)[0];
		return userFile;
	} catch (error) {
		console.error(error);
	}
};

export const getUserParentFolder = async (userEmail: string) => {
	const driveFiles = await googleDrive.files.list({});
	if (!driveFiles?.data?.files) return null;
	const files = driveFiles.data.files.filter(
		(file) => file.mimeType === 'application/vnd.google-apps.folder'
	);
	const userFiles = [];
	for await (const file of files) {
		const fileId = file.id || '';
		const permissionsListResponse = await googleDrive.permissions.list({ fileId });
		if (!permissionsListResponse.data.permissions) return null;
		for await (const permission of permissionsListResponse.data.permissions) {
			const permissions = await googleDrive.permissions.get({
				permissionId: permission.id || '',
				fileId: file.id || '',
				fields: 'emailAddress'
			});

			if (permissions.data.emailAddress === userEmail) {
				const parentFile = (await googleDrive.files.list()).data.files?.find(
					(file) => file.id === fileId
				);
				parentFile && userFiles.push(parentFile);
			}
		}
	}
	const userFile = userFiles.filter(Boolean)[0];
	return userFile;
};
