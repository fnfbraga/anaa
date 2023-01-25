import {
	deleteRecordFromFile,
	getSourcedFileById,
	getUserFile,
	updateSourceFile
} from '$lib/services/google-drive';
import type { RequestHandler } from './$types';

export const GET = (async ({ locals }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Not Authorized', { status: 401 });
	}
	const file = await getUserFile(session.user.email || '');
	if (!file) {
		return new Response('No file', { status: 404 });
	}
	const sourceFile = await getSourcedFileById(file?.id || '');
	return new Response(
		JSON.stringify({
			file: JSON.parse(sourceFile || '[]')
		})
	);
}) satisfies RequestHandler;

export const POST = (async ({ locals, request }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Not Authorized', { status: 401 });
	}
	const requestData = await request.json();
	const file = await getUserFile(session.user.email || '');
	if (!file) {
		return new Response('No file', { status: 404 });
	}
	await updateSourceFile(file?.id || '', requestData);
	return new Response(JSON.stringify('ok'));
}) satisfies RequestHandler;

export const DELETE = (async ({ locals, request }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Not Authorized', { status: 401 });
	}
	const requestData = await request.json();
	const file = await getUserFile(session.user.email || '');
	if (!file || !file.id) {
		return new Response('No file', { status: 404 });
	}
	await deleteRecordFromFile(file.id, requestData);
	return new Response(JSON.stringify('ok'));
}) satisfies RequestHandler;
