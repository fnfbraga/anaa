<script>
	import LoginItem from '$lib/components/LoginItem.svelte';
	import NoteItem from '$lib/components/NoteItem.svelte';
	import { logins, notes } from '$lib/store';
</script>

<svelte:head>
	<meta name="ANAA" content="Another Nice Auth App" />
</svelte:head>

<section class="flex flex-col items-center mt-2">
	{#each $logins as login}
		{#if login}
			<LoginItem {login} />
		{/if}
	{/each}
	{#each $notes as note}
		{#if note}
			<NoteItem {note} />
		{/if}
	{/each}
</section>
