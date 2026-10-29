import { build, files, version } from '$service-worker';

const worker = self as unknown as any;
const STATIC_CACHE_NAME = `cache${version}`;

// Only cache static bundler-generated assets and static directory files.
// Dynamic SSR routes and server data must always be fetched from the SvelteKit server.
const addDomain = (assets: string[]) => assets.map((f) => self.location.origin + f);

const ourAssets = addDomain([
	...files.filter((f) => !/\/icons\/(apple.*?|original.png)/.test(f)),
	...build
]);

const staticAssets = new Set(ourAssets);

worker.addEventListener('install', (event: any) => {
	event.waitUntil(
		caches
			.open(STATIC_CACHE_NAME)
			.then((cache) => cache.addAll(ourAssets))
			.then(() => {
				worker.skipWaiting();
			})
	);
});

worker.addEventListener('activate', (event: any) => {
	event.waitUntil(
		caches.keys().then(async (keys) => {
			for (const key of keys) {
				if (key !== STATIC_CACHE_NAME) {
					await caches.delete(key);
				}
			}
			worker.clients.claim();
		})
	);
});

worker.addEventListener('fetch', (event: any) => {
	if (event.request.method !== 'GET' || event.request.headers.has('range')) {
		return;
	}

	const url = new URL(event.request.url);
	const isStaticAsset = staticAssets.has(url.href);

	if (isStaticAsset) {
		event.respondWith(
			caches.match(event.request).then((cached) => cached || fetch(event.request))
		);
	}
});
