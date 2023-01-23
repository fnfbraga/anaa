import { getSourcedFileById, getUserFile } from '$lib/functions/google-drive';

export async function GET({ locals }: any) {
	const session = await locals.getSession();
	if (!session.user) {
		return new Response('Not Authorized', { status: 401 });
	}
	const file = await getUserFile(session.user.email);
	if (!file) {
		return new Response('No file', { status: 404 });
	}
	const sourceFile = await getSourcedFileById(file?.id || '');
	return new Response(
		JSON.stringify({
			file: JSON.parse(sourceFile || '[]')
		})
	);
}
