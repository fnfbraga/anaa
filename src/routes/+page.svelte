<script lang="ts">
	import LoginItem from '$lib/components/LoginItem.svelte';
	import NoteItem from '$lib/components/NoteItem.svelte';
	import type { Login } from '$lib/models/logins';
	import type { Note } from '$lib/models/notes';
	import Fab from '$lib/components/FAB.svelte';
	import { sourceFile } from '$lib/store';
	import { onMount } from 'svelte';

	$: notes = $sourceFile?.filter((item) => (item as Note)?.note);
	$: logins = $sourceFile?.filter((item) => (item as Login)?.url);
	let notFound = false;

	onMount(() => {
		if (!$sourceFile.length) {
			fetch('/api/get-file')
				.then(async (response) => {
					if (response.status === 200) {
						const res = await response.json();
						sourceFile.set(res.file);
						return;
					}
					if (response.status === 404) {
						notFound = true;
					}
				})
				.catch((error) => {
					console.error('+page.svelte:25 ~ fetch ~ error', error);
				});
		}
	});
</script>

<svelte:head>
	<meta name="ANAA" content="Another Nice Auth App" />
</svelte:head>

{#if notFound}
	<div class="pt-10">
		Please create a File in <a class="hover:underline" href="/user-settings">User Settings</a>
	</div>
{:else}
	<section class="flex flex-col items-center mt-2">
		{#each logins as login}
			{#if login}
				<LoginItem {login} />
			{/if}
		{/each}
		{#each notes as note}
			{#if note}
				<NoteItem {note} />
			{/if}
		{/each}
		<Fab />
	</section>
{/if}
