<script lang="ts">
	import type { Note } from '$lib/models/notes';
	import Modal from './Modal.svelte';
	import Name from './Name.svelte';
	import Tags from './Tags.svelte';

	export let note: Note;
	let showModal = false;
</script>

{#if showModal}
	<Modal on:close={() => (showModal = false)}>
		<div class="flex flex-col space-y-4 p-4">
			<span class="self-center space-x-4">
				<button on:click class="hover:border-b-sky-500 hover:border-b-2 hover:-mb-0.5 ">
					EDIT
				</button>
				<button on:click class="hover:border-b-red-500 hover:border-b-2 hover:-mb-0.5">
					DELETE
				</button>
			</span>
			<Name name={note.name} handleShowModal={() => (showModal = true)} />
			<span class="w-full h-80 overflow-y-auto font-mono text-sm bg-slate-200 p-2 rounded-md">
				{note.note}
			</span>
			<Tags tags={note.tags} />
		</div>
	</Modal>
{/if}

<div class="flex w-11/12 m-2 space-x-4 rounded shadow p-4 pl-8 hover:shadow-md">
	<span class="cursor-pointer ml-2 text-xs w-1/5 lg:w-1/6 ">
		<Name name={note.name} handleShowModal={() => (showModal = true)} />
	</span>
	<span class="w-8/12 truncate font-mono text-sm bg-slate-200 p-1 rounded-md">
		{note.note}
	</span>
	<span class="w-1/5 hidden sm:block">
		<Tags tags={note.tags} />
	</span>
</div>
