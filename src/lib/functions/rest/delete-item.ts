import { AlertEnum } from '$lib/models/misc';
import { alerts } from '$lib/store';
import fetchFile from './fetch-file';

export default async (recordId: string) => {
	const handleError = async () => {
		await fetchFile();
		alerts.update((alerts) => [
			...alerts,
			{
				type: AlertEnum.error,
				message: `Something went wrong deleting record ${recordId}`,
				createdOn: new Date().getTime()
			}
		]);
	};

	fetch('/api/get-file', { method: 'DELETE', body: JSON.stringify(recordId) })
		.then((response) => {
			if (response.status === 200) {
				alerts.update((alerts) => [
					...alerts,
					{
						type: AlertEnum.info,
						message: `Record ${recordId} deleted successfully`,
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
