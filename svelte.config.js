import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import ESBuildNodePolyfillsPlugin from 'esbuild-plugin-node-polyfills';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			target: 'esnext',
			minify: true,
			logLevel: 'error',
			plugins: [ESBuildNodePolyfillsPlugin]
		})
	}
};

export default config;
