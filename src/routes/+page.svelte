<script lang="ts">
	import LoginItem from '$lib/components/LoginItem.svelte';
	import NoteItem from '$lib/components/NoteItem.svelte';
	import Fab from '$lib/components/FAB.svelte';
	import Header from '$lib/components/Header.svelte';
	import type { PageData } from './$types';
	import { TypesEnum } from '$lib/schema';

	export let data: PageData;
</script>

<svelte:head>
	<meta name="ANAA" content="Another Nice Auth App" />
</svelte:head>

<div>
	<Header />
	{#each data.initialItems as item}
		{#if item.type === TypesEnum.login}
			<LoginItem login={item} />
		{/if}
		{#if item.type === TypesEnum.note}
			<NoteItem note={item} />
		{/if}
	{/each}
	<Fab />
</div>
