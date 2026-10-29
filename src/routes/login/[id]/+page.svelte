<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Input from '$lib/components/Input.svelte';
	import { z } from 'zod';
	import TagInput from '$lib/components/TagInput.svelte';
	import Password from '$lib/components/Password.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { type Item } from '$lib/schema';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { alerts } from '$lib/store';
	import { AlertEnum } from '$lib/models/misc';
	import CopyIcon from '$lib/components/CopyIcon.svelte';
	import { handleCopytoClipBoard } from '$lib/functions/copy-to-clipboard';

	export let data: PageData;

	$: id = $page.params.id;
	$: edit = id === 'new';
	let setDelete = false;
	let loadingState = false;

	const Login = z.object({
		name: z.string().min(1),
		url: z.string().optional(),
		username: z.string(),
		password: z.string(),
		tags: z.array(z.string()).optional(),
		favorite: z.string().optional()
	});
	type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

	$: values = {
		name: data.name || '',
		url: data.url || '',
		username: data.username || '',
		password: data.password || '',
		tags: data.tags || [],
		favorite: data.favorite || 'false'
	} as Omit<Omit<Omit<Item, 'note'>, 'id'>, 'type'>;

	$: errors = () => {
		let error: Array<any> = [];
		try {
			Login.parse(values);
			error = [];
			return error;
		} catch (e) {
			error.push(e);
			return error;
		}
	};

	$: modalTitle =
		id === 'new' ? 'New Login' : edit ? `Edit ${values.name || 'Login'}` : values.name || 'Login Details';
</script>

<Modal closeRoute="/" title={modalTitle}>
	<span slot="header">
		<Badge variant="secondary" class="text-[11px]">Login</Badge>
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
							? `login ${values.name} deleted successfully`
							: id === 'new'
							? 'login created successfully'
							: `login ${values.name} updated successfully`;
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
									? `Something went wrong deleting login ${id}`
									: 'Something went wrong creating/updating login',
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
					<span class="text-xs text-muted-foreground pl-1">Viewing encrypted credential</span>
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
					<span class="text-xs font-medium text-destructive pl-1">Delete this login permanently?</span>
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
				placeholder="e.g. GitHub, Personal Email"
				required
			/>

			<div class="flex items-end gap-1.5">
				<div class="flex-1 min-w-0">
					<Input
						id="url"
						disabled={!edit}
						bind:inputValue={values.url}
						name="url"
						label="url"
						aria-label="Url"
						placeholder="https://example.com"
						inputType="url"
					/>
				</div>
				{#if values.url}
					<div class="pb-0.5 shrink-0 flex items-center">
						<CopyIcon
							label="Copy URL"
							on:click={() => {
								handleCopytoClipBoard({
									message: 'url copied to clipboard',
									content: values.url
								});
							}}
						/>
					</div>
				{/if}
			</div>

			<div class="flex items-end gap-1.5">
				<div class="flex-1 min-w-0">
					<Input
						id="username"
						disabled={!edit}
						bind:inputValue={values.username}
						name="username"
						label="username"
						aria-label="Username"
						placeholder="username or email@example.com"
					/>
				</div>
				<div class="pb-0.5 shrink-0">
					<CopyIcon
						disabled={!values.username}
						label="Copy username"
						on:click={() => {
							handleCopytoClipBoard({
								message: 'username copied to clipboard',
								content: values.username
							});
						}}
					/>
				</div>
			</div>

			<Password {edit} disabled={!edit} bind:password={values.password} isModal={true} />

			<TagInput disabled={!edit} bind:tags={values.tags} />

			{#if edit}
				<div class="flex justify-end pt-3">
					<Button
						id="submit-login"
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
