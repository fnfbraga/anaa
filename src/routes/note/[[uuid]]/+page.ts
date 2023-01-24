import type { PageLoad } from './$types';

export const load = (({ params, ...other }) => {
	if (params.uuid) {
		return { ...other, uuid: params.uuid };
	}
	return other;
}) satisfies PageLoad;
