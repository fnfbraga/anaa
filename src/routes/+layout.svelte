<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Alerts from '$lib/components/Alerts.svelte';
	import { navigating } from '$app/stores';
	import Loading from '$lib/components/Loading.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import Header from '$lib/components/Header.svelte';

	onMount(() => {
		if (!$page.data.session?.user) {
			if (browser) {
				goto('/sign-in');
			}
		}
	});
</script>

<main class="mb-auto h-10 w-screen">
	<Header />
	{#if $navigating}
		<Loading />
	{:else}
		<slot />
	{/if}
</main>
<Alerts />
<Footer />
