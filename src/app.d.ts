// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
	interface Platform {
		env: {
			AUTH_SECRET: string;
			GOOGE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;
			GOOGLE_API_KEY: string;
			AUTH_TRUST_HOST: string;
			ALLOWED_USERS: string[];
			SERVICE_ACCOUNT_PROJECT_ID: string;
			SERVICE_ACCOUNT_PRIVATE_KEY_ID: string;
			SERVICE_ACCOUNT_PRIVATE_KEY: string;
			SERVICE_ACCOUNT_CLIENT_EMAIL: string;
			SERVICE_ACCOUNT_CLIENT_ID: string;
			SERVICE_ACCOUNT_CLIENT_CERT_URL: string;
		};
		context: {
			waitUntil(promise: Promise<any>): void;
		};
		caches: CacheStorage & { default: Cache };
	}
}
