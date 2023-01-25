import type { Login } from '$lib/models/logins';
import { AlertEnum } from '$lib/models/misc';
import type { Note } from '$lib/models/notes';
import { alerts } from '$lib/store';
import fetchFile from './fetch-file';

export default async (file: Array<Note | Login | null>) => {
	const handleError = async () => {
		await fetchFile();
		alerts.update((alerts) => [
			...alerts,
			{
				type: AlertEnum.error,
				message: 'Something went wrong with your file update',
				createdOn: new Date().getTime()
			}
		]);
	};

	fetch('/api/get-file', { method: 'POST', body: JSON.stringify(file) })
		.then((response) => {
			if (response.status === 200) {
				alerts.update((alerts) => [
					...alerts,
					{
						type: AlertEnum.info,
						message: 'File successfully updated',
						createdOn: new Date().getTime()
					}
				]);
				return;
			}
			handleError();
		})
		.catch((error) => {
			console.error('sourceFile.subscribe ~ error', error);
			handleError();
		});
};
