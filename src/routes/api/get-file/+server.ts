import {
	deleteRecordFromFile,
	getSourcedFileById,
	getUserFile,
	updateOrAddRecordFromFile,
	updateSourceFile
} from '$lib/services/google-drive';
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';

export const GET = (async ({ locals }) => {
	try {
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
	} catch (e: any) {
		error(
        			500,
        			typeof e?.message === 'string' ? JSON.parse(e?.message) : JSON.stringify(e?.message || e)
        		);
	}
}) satisfies RequestHandler;

export const POST = (async ({ locals, request }) => {
	try {
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
	} catch (e: any) {
		error(
        			500,
        			typeof e?.message === 'string' ? JSON.parse(e?.message) : JSON.stringify(e?.message || e)
        		);
	}
}) satisfies RequestHandler;

export const DELETE = (async ({ locals, request }) => {
	try {
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
	} catch (e: any) {
		error(
        			500,
        			typeof e?.message === 'string' ? JSON.parse(e?.message) : JSON.stringify(e?.message || e)
        		);
	}
}) satisfies RequestHandler;

export const PUT = (async ({ locals, request }) => {
	try {
		const session = await locals.getSession();
		if (!session?.user) {
			return new Response('Not Authorized', { status: 401 });
		}
		const requestData = await request.json();
		if (!requestData.uuid?.length || !requestData.name || typeof requestData.type !== 'number') {
			return new Response('Invalid request', { status: 401 });
		}
		const file = await getUserFile(session.user.email || '');
		if (!file || !file.id) {
			return new Response('No file', { status: 404 });
		}
		await updateOrAddRecordFromFile(file.id, requestData);
		return new Response(JSON.stringify('ok'));
	} catch (e: any) {
		error(
        			500,
        			typeof e?.message === 'string' ? JSON.parse(e?.message) : JSON.stringify(e?.message || e)
        		);
	}
}) satisfies RequestHandler;
