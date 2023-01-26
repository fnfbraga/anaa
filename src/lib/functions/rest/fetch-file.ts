import { loadingState, notFoundState, sourceFile, sourceFileExists } from '$lib/store';
import { error } from '@sveltejs/kit';

export default async () => {
	loadingState.set(true);
	const url = window?.location
		? `${window.location.protocol}//${window.location.hostname}${
				window.location.port ? ':' + window.location.port : ''
		  }`
		: '';
	await fetch(`${url}/api/get-file`)
		.then(async (response) => {
			if (response.status === 200) {
				sourceFileExists.set(true);
				const res = await response.json();
				sourceFile.set(res.file);
				loadingState.set(false);
				return;
			}
			if (response.status === 404) {
				notFoundState.set(true);
				loadingState.set(false);
				return;
			}
		})
		.catch((e) => {
			loadingState.set(false);
			throw error(500, e);
		});
};
