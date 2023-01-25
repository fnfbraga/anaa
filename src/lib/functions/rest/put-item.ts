import type { Login } from '$lib/models/logins';
import { AlertEnum } from '$lib/models/misc';
import type { Note } from '$lib/models/notes';
import { alerts } from '$lib/store';
import fetchFile from './fetch-file';

export default async (record: Note | Login) => {
	const handleError = async () => {
		await fetchFile();
		alerts.update((alerts) => [
			...alerts,
			{
				type: AlertEnum.error,
				message: `Something went wrong saving record ${record.uuid}`,
				createdOn: new Date().getTime()
			}
		]);
	};

	fetch('/api/get-file', { method: 'PUT', body: JSON.stringify(record) })
		.then((response) => {
			if (response.status === 200) {
				alerts.update((alerts) => [
					...alerts,
					{
						type: AlertEnum.info,
						message: `Record ${record.name} saved successfully`,
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
