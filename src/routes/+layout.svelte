<script lang="ts">
	import { page } from '$app/stores';
	import Fab from '$lib/components/FAB.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import LoginScreen from '$lib/components/LoginScreen.svelte';
	import Alerts from '$lib/components/Alerts.svelte';
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
			<slot />
			<Fab />
		</main>
		<Alerts />
		<Footer />
	</div>
{:else}
	<LoginScreen bind:loading />
{/if}
