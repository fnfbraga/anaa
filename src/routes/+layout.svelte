<script lang="ts">
	import { page, navigating } from '$app/stores';
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Alerts from '$lib/components/Alerts.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Header from '$lib/components/Header.svelte';
</script>

<main class="mb-auto h-10 w-screen">
	{#if $page.data.session?.user}
		<Header />
	{/if}
	{#if $navigating}
		<Loading />
	{:else}
		<slot />
	{/if}
</main>
<Alerts />
<Footer />
