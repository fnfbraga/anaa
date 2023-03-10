import { serviceAccountCredentials } from '$lib/config';
import { google } from 'googleapis';
import { googleClientSecret } from '$lib/config';
import googleDrive from '$lib/services/google-drive';
import type { Note } from '$lib/models/notes';
import type { Login } from '$lib/models/logins';
import { randomBytes, createHash, createCipheriv, createDecipheriv } from 'node:crypto';

const scopes = [
	'https://www.googleapis.com/auth/drive',
	'https://www.googleapis.com/auth/drive.readonly',
	'https://www.googleapis.com/auth/drive.metadata'
];

const auth = new google.auth.JWT(
	serviceAccountCredentials.client_email,
	undefined,
	serviceAccountCredentials.private_key,
	scopes
);

export default google.drive({ version: 'v3', auth });

const algorithm = 'aes-256-ctr';
const iv = randomBytes(16);

interface EncryptedFile {
	iv: string;
	encryptedData: string;
}
const fileName = 'anaa';

const key = createHash('sha256').update(googleClientSecret).digest('base64').substring(0, 32);

function encrypt(text: string) {
	const cipher = createCipheriv(algorithm, Buffer.from(key), iv);
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
	const decipher = createDecipheriv(algorithm, Buffer.from(key), iv);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
}

export const updateSourceFile = async (fileId: string, updatedFile: Array<Note | Login>) => {
	try {
		const res = await googleDrive.files.update({
			fileId,
			media: {
				mimeType: 'application/db',
				body: JSON.stringify(encrypt(JSON.stringify(updatedFile)))
			},
			fields: 'id'
		});
		return res.data.id;
	} catch (error) {
		throw new Error(JSON.stringify(error));
	}
};

export const createSourceFile = async (parentFolderId: string, user: any) => {
	try {
		const res = await googleDrive.files.create({
			media: {
				mimeType: 'application/db',
				body: JSON.stringify(encrypt(JSON.stringify([])))
			},
			fields: 'id',
			requestBody: {
				name: fileName,
				parents: [parentFolderId],
				owners: user
			}
		});
		return res.data.id;
	} catch (error) {
		throw new Error(JSON.stringify(error));
	}
};

export const getSourcedFileById = async (fileId: string) => {
	try {
		const file = await googleDrive.files.get({ fileId, alt: 'media' });
		return decrypt(file.data as any);
	} catch (error) {
		throw new Error(JSON.stringify(error));
	}
};

export const getSourcedFileId = async () => {
	try {
		const files = await googleDrive.files.list({});
		return files.data.files?.find((file) => file.name === fileName)?.id;
	} catch (error) {
		throw new Error(JSON.stringify(error));
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
		throw new Error(JSON.stringify(error));
	}
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
					const parentFile = (
						await googleDrive.files.list({
							fields: '*'
						})
					).data.files?.find((file) => file.id === fileId);
					parentFile && userFiles.push(parentFile);
				}
			}
		}
		const userFile = userFiles.filter(Boolean)[0];
		return userFile;
	} catch (error) {
		throw new Error(JSON.stringify(error));
	}
};

export const getUserParentFolder = async (userEmail: string) => {
	try {
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
	} catch (error) {
		throw new Error(JSON.stringify(error));
	}
};

export const deleteRecordFromFile = async (fileId: string, recordId: string) => {
	const sourceFile = (await getSourcedFileById(fileId)) || JSON.stringify([]);
	const parsedSourceFile = JSON.parse(sourceFile);
	const updatedFile = parsedSourceFile.filter((item: any) => item?.uuid !== recordId);
	await updateSourceFile(fileId, updatedFile);
};

export const updateOrAddRecordFromFile = async (fileId: string, record: Note | Login) => {
	const sourceFile = (await getSourcedFileById(fileId)) || JSON.stringify([]);
	const parsedSourceFile = JSON.parse(sourceFile);
	const oldRecord: Note | Login | null = parsedSourceFile.find(
		(item: any) => item?.uuid === record.uuid
	);
	if (oldRecord) {
		const updatedFile = parsedSourceFile.map((item: any) =>
			item.uuid === oldRecord.uuid ? record : item
		);
		await updateSourceFile(fileId, updatedFile);
	} else {
		const updatedFile = [...parsedSourceFile, record];
		await updateSourceFile(fileId, updatedFile);
	}
};
