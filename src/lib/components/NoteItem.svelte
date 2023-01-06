<script lang="ts">
	import type { Note } from '$lib/models/notes';
	import Button from './Button.svelte';
	import Modal from './Modal.svelte';
	import Name from './Name.svelte';
	import Tags from './Tags.svelte';

	export let note: Note;
	let updatedValues = note;
	let showModal = false;
	let edit = false;
</script>

{#if showModal}
	<Modal on:close={() => (showModal = false)}>
		<div class="flex flex-col space-y-4 p-4">
			<span class="self-center space-x-4">
				{#if !edit}
					<Button on:click={() => (edit = true)} color="sky-500" text="EDIT" />
				{:else}
					<Button on:click={() => console.log(updatedValues)} color="green-500" text="SAVE" />
					<Button on:click={() => (edit = false)} color="stone-500" text="CANCEL" />
				{/if}
				<Button on:click={() => console.log('delete')} color="red-500" text="DELETE" />
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
