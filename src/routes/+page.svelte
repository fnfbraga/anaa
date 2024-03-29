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
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';

	$: notes = $sourceFile?.filter((item) => item?.type === ItemType.note) as Array<Note>;
	$: visibleNotes = $searchState
		? notes
				.filter(
					(note) =>
						note.name?.toLowerCase().includes($searchState?.toLowerCase() as string) ||
						note.note?.toLowerCase().includes($searchState?.toLowerCase() as string) ||
						note.tags?.some((tag) =>
							tag?.toLowerCase().includes($searchState?.toLowerCase() as string)
						)
				)
				.sort((a, b) => ((a?.name || 0) > (b?.name || 0) ? 1 : -1))
		: notes.sort((a, b) => ((a?.name || 0) > (b?.name || 0) ? 1 : -1));
	$: logins = $sourceFile?.filter((item) => item?.type === ItemType.login) as Array<Login>;
	$: visibleLogins = $searchState
		? logins
				.filter(
					(login) =>
						login.name?.toLowerCase().includes($searchState?.toLowerCase() as string) ||
						login.url?.toLowerCase().includes($searchState?.toLowerCase() as string) ||
						login.username?.toLowerCase().includes($searchState?.toLowerCase() as string) ||
						login.tags?.some((tag) =>
							tag?.toLowerCase().includes($searchState?.toLowerCase() as string)
						)
				)
				.sort((a, b) => ((a?.name || 0) > (b?.name || 0) ? 1 : -1))
		: logins.sort((a, b) => ((a?.name || 0) > (b?.name || 0) ? 1 : -1));

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

<div>
	{#if $page.data.session?.user}
		<Header />
		{#if $notFoundState}
			<div class="pt-10 flex justify-center">
				Please create a File in &nbsp;<a class="hover:underline" href="/user-settings"
					>User Settings</a
				>
			</div>
		{:else}
			{#if $loadingState}
				<span class="flex h-5/6 justify-center items-center">
					<Loading />
				</span>
			{/if}

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
		{/if}
	{/if}
</div>
