import type { Actions, PageServerLoad } from './$types';
import googleDriveService from '$lib/services/google-drive';
import { serviceAccountCredentials } from '$lib/config';
import { createSourceFile, getUserFile, getUserParentFolder } from '$lib/services/google-drive';

export const load: PageServerLoad = async ({ locals }) => {
	const userEmail = (await locals.getSession())?.user?.email;
	const userFile = await getUserFile(userEmail || '');
	return {
		clientEmail: serviceAccountCredentials.client_email,
		responseData: userFile
	};
};

export const actions: Actions = {
	createFile: async ({ locals }) => {
		const user = (await locals.getSession())?.user;
		const userEmail = user?.email;
		let success = false;
		const userParentFolder = await getUserParentFolder(userEmail || '');
		if (userParentFolder) {
			await createSourceFile(userParentFolder?.id || '', user);
			success = true;
		}
		return { createdFile: success };
	},
	deleteFile: async ({ locals }) => {
		const userEmail = (await locals.getSession())?.user?.email;
		let success;
		const userFile = await getUserFile(userEmail || '');
		await googleDriveService.files.delete({ fileId: userFile?.id || '' });
		return { deletedFile: success };
	}
};
