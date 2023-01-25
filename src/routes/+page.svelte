<script lang="ts">
	import LoginItem from '$lib/components/LoginItem.svelte';
	import NoteItem from '$lib/components/NoteItem.svelte';
	import Fab from '$lib/components/FAB.svelte';
	import {
		filterState,
		loadingState,
		notFoundState,
		searchState,
		sourceFile,
		sourceFileExists
	} from '$lib/store';
	import Loading from '$lib/components/Loading.svelte';
	import { ItemType } from '$lib/models/misc';
	import type { Login } from '$lib/models/logins';
	import type { Note } from '$lib/models/notes';
	import { onMount } from 'svelte';

	$: notes = $sourceFile?.filter((item) => item?.type === ItemType.note) as Array<Note>;
	$: visibleNotes = $searchState
		? notes.filter(
				(note) =>
					note.name?.includes($searchState as string) ||
					note.note?.includes($searchState as string) ||
					note.tags?.some((tag) => tag.includes($searchState as string))
		  )
		: notes;
	$: logins = $sourceFile?.filter((item) => item?.type === ItemType.login) as Array<Login>;
	$: visibleLogins = $searchState
		? logins.filter(
				(login) =>
					login.name?.includes($searchState as string) ||
					login.url?.includes($searchState as string) ||
					login.username?.includes($searchState as string) ||
					login.tags?.some((tag) => tag.includes($searchState as string))
		  )
		: logins;

	onMount(async () => {
		if (!$sourceFileExists) {
			const FetchFile = await import('$lib/functions/rest/fetch-file');
			await FetchFile.default();
		}
	});
</script>

<svelte:head>
	<meta name="ANAA" content="Another Nice Auth App" />
</svelte:head>

{#if $notFoundState}
	<div class="pt-10 flex justify-center">
		Please create a File in &nbsp;<a class="hover:underline" href="/user-settings">User Settings</a>
	</div>
{:else}
	{#if $loadingState}
		<span class="flex h-5/6 justify-center items-center">
			<Loading />
		</span>
	{/if}
	<section>
		<div class="flex flex-col mt-2 w-4/5 m-auto">
			{#each visibleLogins as login}
				{#if login && (!$filterState || $filterState === 'logins')}
					<LoginItem {login} />
				{/if}
			{/each}
			{#each visibleNotes as note}
				{#if note && (!$filterState || $filterState === 'notes')}
					<NoteItem {note} />
				{/if}
			{/each}
		</div>
		<Fab />
	</section>
{/if}
