import {
	ALLOWED_USERS,
	GOOGE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	SERVICE_ACCOUNT_CLIENT_CERT_URL,
	SERVICE_ACCOUNT_CLIENT_EMAIL,
	SERVICE_ACCOUNT_CLIENT_ID,
	SERVICE_ACCOUNT_PRIVATE_KEY,
	SERVICE_ACCOUNT_PRIVATE_KEY_ID,
	SERVICE_ACCOUNT_PROJECT_ID,
	DB_HOST,
	DB_USER,
	DB_PASSWORD,
	DB_NAME
} from '$env/static/private';

export const googleClientId = GOOGE_CLIENT_ID || '';
export const googleClientSecret = GOOGLE_CLIENT_SECRET || '';
export const serviceAccountCredentials = {
	type: 'service_account',
	project_id: SERVICE_ACCOUNT_PROJECT_ID,
	private_key_id: SERVICE_ACCOUNT_PRIVATE_KEY_ID,
	private_key: Buffer.from(SERVICE_ACCOUNT_PRIVATE_KEY, 'base64').toString('ascii'),
	client_email: SERVICE_ACCOUNT_CLIENT_EMAIL,
	client_id: SERVICE_ACCOUNT_CLIENT_ID,
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url: SERVICE_ACCOUNT_CLIENT_CERT_URL
};
export const allowedUsers: Array<string | undefined> = JSON.parse(ALLOWED_USERS) || [];
export const dbHost = DB_HOST || '';
export const dbUser = DB_USER || '';
export const dbPassword = DB_PASSWORD || '';
export const dbName = DB_NAME || '';
