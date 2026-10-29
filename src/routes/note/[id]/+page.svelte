<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Input from '$lib/components/Input.svelte';
	import { z } from 'zod';
	import TagInput from '$lib/components/TagInput.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import CopyIcon from '$lib/components/CopyIcon.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { handleCopytoClipBoard } from '$lib/functions/copy-to-clipboard';
	import { type Item } from '$lib/schema';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { alerts } from '$lib/store';
	import { AlertEnum } from '$lib/models/misc';

	export let data: PageData;

	$: id = $page.params.id;
	$: edit = id === 'new';
	let setDelete = false;
	let loadingState = false;

	const Note = z.object({
		name: z.string().min(1),
		note: z.string().min(1),
		tags: z.array(z.string()).optional(),
		favorite: z.string().optional()
	});
	type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

	$: values = {
		name: data.name || '',
		tags: data.tags || [],
		favorite: data.favorite || 'false',
		note: data.note || ''
	} as Omit<Omit<Omit<Item, 'username'>, 'id'>, 'type'>;

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

	$: modalTitle =
		id === 'new' ? 'New Secure Note' : edit ? `Edit ${values.name || 'Note'}` : values.name || 'Secure Note';
</script>

<Modal closeRoute="/" title={modalTitle}>
	<span slot="header">
		<Badge variant="secondary" class="text-[11px]">Note</Badge>
	</span>

	{#if loadingState}
		<Loading />
	{/if}

	<form
		method="POST"
		action={id === 'new' ? '?/add' : '?/edit'}
		autocomplete="off"
		class="space-y-5"
		use:enhance={({ action }) => {
			loadingState = true;
			const actionName = action.search;
			return async ({ result, update }) => {
				loadingState = false;
				if (result.type === 'redirect' || result.type === 'success') {
					const message =
						actionName === '?/delete'
							? `note ${values.name} deleted successfully`
							: id === 'new'
							? 'note created successfully'
							: `note ${values.name} updated successfully`;
					alerts.update((current) => [
						...current,
						{
							type: AlertEnum.info,
							message,
							createdOn: new Date().getTime()
						}
					]);
					await update();
				} else {
					alerts.update((current) => [
						...current,
						{
							type: AlertEnum.error,
							message:
								actionName === '?/delete'
									? `Something went wrong deleting note ${id}`
									: 'Something went wrong creating/updating note',
							createdOn: new Date().getTime()
						}
					]);
				}
			};
		}}
	>
		{#if id && id !== 'new'}
			<input type="hidden" name="id" value={id} />
		{/if}

		{#if id && id !== 'new'}
			<div class="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted/40 p-2.5 border border-border/60">
				{#if !edit && !setDelete}
					<div class="flex items-center gap-1.5">
						<span class="text-xs text-muted-foreground pl-1">Encrypted note</span>
						{#if values.note}
							<CopyIcon
								label="Copy note content"
								on:click={() => {
									handleCopytoClipBoard({
										message: 'note copied to clipboard',
										content: values.note
									});
								}}
							/>
						{/if}
					</div>
					<div class="flex items-center gap-2">
						<Button
							type="button"
							size="sm"
							on:click={() => (edit = true)}
							color="hover:border-b-sky-500"
							text="EDIT"
						/>
						<Button
							type="button"
							size="sm"
							on:click={() => (setDelete = true)}
							color="hover:border-b-red-500"
							text="DELETE"
						/>
					</div>
				{:else if edit}
					<span class="text-xs font-medium text-primary pl-1">Editing mode active</span>
					<Button
						type="button"
						size="sm"
						on:click={() => (edit = false)}
						color="hover:border-b-stone-500"
						text="CANCEL"
					/>
				{/if}
				{#if setDelete}
					<span class="text-xs font-medium text-destructive pl-1">Delete this note permanently?</span>
					<div class="flex items-center gap-2">
						<Button
							type="button"
							size="sm"
							on:click={() => (setDelete = false)}
							color="hover:border-b-stone-500"
							text="CANCEL"
						/>
						<Button
							type="submit"
							size="sm"
							formaction="?/delete"
							color="hover:border-b-red-500"
							text="CONFIRM DELETION"
						/>
					</div>
				{/if}
			</div>
		{/if}

		<div id="input-container" class="space-y-4">
			<Input
				id="name"
				disabled={!edit}
				bind:inputValue={values.name}
				type="text"
				name="name"
				label="name"
				aria-label="Name"
				placeholder="Note title (e.g. Recovery Codes, WiFi)"
				required
			/>
			<Input
				id="note"
				label="note"
				bind:inputValue={values.note}
				inputType="textarea"
				name="note"
				aria-label="Note"
				placeholder="Write your encrypted note here..."
				disabled={!edit}
				required
			/>
			<TagInput disabled={!edit} bind:tags={values.tags} />
			{#if edit}
				<div class="flex justify-end pt-3">
					<Button
						id="submit-note"
						type="submit"
						disabled={errors().length > 0 || loadingState}
						color="hover:border-b-sky-500"
						text="SAVE"
						class="w-full sm:w-auto min-w-[140px]"
					/>
				</div>
			{/if}
		</div>
	</form>
</Modal>
