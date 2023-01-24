<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Input from '$lib/components/Input.svelte';
	import { z } from 'zod';
	import TagInput from '$lib/components/TagInput.svelte';
	import { ItemType } from '$lib/models/misc';
	import { loadingState, sourceFile, sourceFileExists } from '$lib/store';
	import { v4 as uuidv4 } from 'uuid';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import fetchFile from '$lib/functions/fetch-file';
	import { goto } from '$app/navigation';
	import postUpdate from '$lib/functions/post-update';
	import Loading from '$lib/components/Loading.svelte';

	export let data: PageData;
	let edit = !data.uuid;
	let setDelete = false;

	const Note = z.object({
		uuid: z.string().optional(),
		name: z.string().min(1),
		note: z.string().optional(),
		tags: z.array(z.string()).optional()
	});
	type NoteType = z.infer<typeof Note>;
	type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
	type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

	$: values = {
		uuid: '',
		type: ItemType.note,
		name: undefined,
		note: undefined,
		tags: []
	} as PartialBy<NoteType, 'name'>;
	$: errors = () => {
		let error: Array<any> = [];
		try {
			Note.parse(values);
			error = [];
			return error;
		} catch (e) {
			error.push(e);
			return error;
		}
	};
	const handleSubmit = async () => {
		if (!data.uuid) {
			sourceFile.update((items) => [...items, { ...values, uuid: uuidv4() }] as any);
		} else {
			sourceFile.update(
				(values) =>
					values.map((value) => {
						if (value?.uuid === (values as any).uuid) return values;
						return value;
					}) as any
			);
		}
		await postUpdate($sourceFile as any);
		goto('/');
		edit = false;
	};
	const handleDelete = async () => {
		if (!data.uuid) return;
		sourceFile.update((items) => items.filter((item) => item?.uuid !== values.uuid));
		await postUpdate($sourceFile);
		setDelete = false;
		goto('/');
	};
	onMount(async () => {
		if (data.uuid) {
			if (!$sourceFileExists) {
				const FetchFile = await import('$lib/functions/fetch-file');
				await FetchFile.default();
			}
			const uuid = $sourceFile.find((item) => item?.uuid == data.uuid);
			if (uuid) {
				values = uuid;
				return;
			}
			console.error(`could not find uuid: ${data.uuid}`);
			return;
		}
		return () => {};
	});
</script>

<Modal closeRoute="/">
	{#if $loadingState}
		<Loading />
	{/if}
	<form autocomplete="off">
		<div class="p-4 ">
			{#if data.uuid}
				{#if !edit && !setDelete}
					<Button on:click={() => (edit = true)} color="hover:border-b-sky-500" text="EDIT" />
					<Button
						on:click={() => (setDelete = true)}
						color="hover:border-b-red-500"
						text="DELETE"
					/>
				{:else if edit}
					<Button on:click={() => (edit = false)} color="hover:border-b-stone-500" text="CANCEL" />
				{/if}
				{#if setDelete}
					<Button
						on:click={() => (setDelete = false)}
						color="hover:border-b-stone-500"
						text="CANCEL"
					/>
					<Button on:click={handleDelete} color="hover:border-b-red-500" text="CONFIRM DELETION" />
				{/if}
			{/if}
		</div>
		<div id="input-container" class="pl-4 pr-4 space-y-4">
			<Input
				value={values.name}
				bind:inputValue={values.name}
				type="text"
				name="name"
				id="name"
				label="name"
				aria-label="Name"
				required
				disabled={!edit}
			/>
			<Input
				id="note"
				label="note"
				value={values.note}
				bind:inputValue={values.note}
				classes=" bg-stone-100"
				inputType="textarea"
				name="note"
				aria-label="Note"
				disabled={!edit}
			/>
			<TagInput disabled={!edit} bind:tags={values.tags} />
			{#if edit}
				<div class="flex justify-center pt-10">
					<Button
						id="submit-login"
						disabled={errors().length > 0}
						color="hover:border-b-sky-500"
						text="SAVE"
						on:click={handleSubmit}
					/>
				</div>
			{/if}
		</div>
	</form>
</Modal>
