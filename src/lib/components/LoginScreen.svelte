<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import GoogleLogo from '$lib/components/GoogleLogo.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	export let loading: boolean;

	const handleSignIn = async () => {
		loading = true;
		await signIn('google', { redirect: false })
			.then((v) => {
				loading = false;
			})
			.catch((e) => console.error(e))
			.finally(() => {
				if (browser) {
					goto('/');
				}
			});
	};
</script>

<div id="signm-in-container" class="flex flex-col w-full h-screen items-center justify-center ">
	<div
		class="flex flex-col min-w-[200px] w-1/2 px-4 py-8 h-fit rounded-lg shadow-lg border-2 items-center"
	>
		<p class="text-lg mt-3 bg-slate-800 rounded-lg px-2 py-1 text-white text-center w-20 ">ANAA</p>
		<p class="text-xl">Login</p>
		<button
			class="flex max-w-lg mt-10 rounded-lg border-2 p-2 bg-blue-600 text-emerald-50"
			on:click={handleSignIn}
		>
			<GoogleLogo />
			<p class="ml-2">{!loading ? 'Sign In with Google' : 'Loading...'}</p>
		</button>
	</div>
</div>
