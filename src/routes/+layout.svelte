<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import LoginScreen from '$lib/components/LoginScreen.svelte';
	import Alerts from '$lib/components/Alerts.svelte';
	import { navigating } from '$app/stores';
	import Loading from '$lib/components/Loading.svelte';

	$: userData = $page.data.session?.user;
	let loading = false;
</script>

{#if userData && !loading}
	<div
		id="app-container"
		class="flex flex-col w-screen h-screen items-center justify-between align-middle "
	>
		<Header />
		<main class="mb-auto h-10 ">
			{#if $navigating}
				<Loading />
			{:else}
				<slot />
			{/if}
		</main>
		<Alerts />
		<Footer />
	</div>
{:else}
	<LoginScreen bind:loading />
{/if}
