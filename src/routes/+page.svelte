<script>
	import LoginItem from '$lib/components/LoginItem.svelte';
	import { logins } from '$lib/store';
</script>

<svelte:head>
	<meta name="ANAA" content="Another Nice Auth App" />
</svelte:head>

<section class="flex er flex-col items-center mt-2">
	{#each $logins as login}
		{#if login}
			<LoginItem {login} />
		{/if}
	{/each}
</section>
