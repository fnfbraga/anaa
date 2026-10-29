<script lang="ts">
	import { page, navigating } from '$app/stores';
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Alerts from '$lib/components/Alerts.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Header from '$lib/components/Header.svelte';

	$: isRouteChange =
		Boolean($navigating) &&
		$navigating?.from?.url.pathname !== $navigating?.to?.url.pathname;
</script>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
	>
		Skip to main content
	</a>

	{#if $page.data.session?.user}
		<Header />
	{/if}

	<main
		id="main-content"
		class="flex-1 w-full container mx-auto max-w-5xl px-3 sm:px-6 py-4 sm:py-6 pb-24"
	>
		{#if isRouteChange}
			<Loading />
		{:else}
			<slot />
		{/if}
	</main>

	<Alerts />
	<Footer />
</div>
