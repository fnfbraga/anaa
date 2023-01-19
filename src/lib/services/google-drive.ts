import { serviceAccountCredentials } from '$lib/config';
import { google } from 'googleapis';

const scopes = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.JWT(
	serviceAccountCredentials.client_email,
	undefined,
	serviceAccountCredentials.private_key,
	scopes
);

export default google.drive({ version: 'v3', auth });
