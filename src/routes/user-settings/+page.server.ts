import type { Actions, PageServerLoad } from './$types';
import googleDriveService from '$lib/services/google-drive';
import { serviceAccountCredentials } from '$lib/config';
import { createSourceFile, deleteSourceFile } from '$lib/functions/google-drive';

export const load: PageServerLoad = async () => {
	const responseData = await googleDriveService.files.list({});

	return {
		clientEmail: serviceAccountCredentials.client_email,
		responseData: responseData.data.files?.filter(
			(file) => file.mimeType !== 'application/vnd.google-apps.folder' && file.name !== '_anaa'
		)
	};
};

export const actions: Actions = {
	createFile: async () => {
		let success;
		const driveFiles = await googleDriveService.files.list({});
		const files = driveFiles?.data.files;
		if (!files?.length) {
			success = false;
			console.error('no files found');
		}
		if (files?.length === 1 && files[0].mimeType === 'application/vnd.google-apps.folder') {
			const parentFolderId = files[0].id || '';
			const id = await createSourceFile(parentFolderId);
			console.log('🚀 ~ file: +page.server.ts:29 ~ createFile: ~ id', id);
			success = true;
		}

		return { createdFile: success };
	},
	deleteFile: async () => {
		let success;
		const driveFiles = await googleDriveService.files.list({});
		const files = driveFiles?.data.files;
		if (!files?.length) {
			success = false;
			console.error('no files found');
		}
		if (files?.length === 2 && files[0].mimeType !== 'application/vnd.google-apps.folder') {
			const file = files.find((file) => file.name === 'anaa');
			if (!file?.id) {
				console.error('cannot find file');
				success = false;
			}
			await deleteSourceFile(file?.id as string);
		}

		success = true;
		return { deletedFile: success };
	}
};
