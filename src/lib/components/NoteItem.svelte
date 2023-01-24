<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Note } from '$lib/models/notes';
	import Name from './Name.svelte';
	import Tags from './Tags.svelte';

	export let note: Note;
</script>

<div class="flex w-full m-2 space-x-4 rounded shadow p-4 pl-8 hover:shadow-md">
	<span class="w-1/6 lg:w-1/6 cursor-pointer ml-2 text-xs">
		<Name name={note.name} handleShowModal={() => goto(`/note/${note.uuid}`)} />
	</span>
	<span class="w-4/6 truncate font-mono text-sm bg-slate-200 p-1 rounded-md">
		{note.note || ''}
	</span>
	<span class="w-[140px] lg:w-[140px] hidden sm:block">
		<Tags tags={note.tags} />
	</span>
</div>
