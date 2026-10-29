<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Input from '$lib/components/Input.svelte';
	import { z } from 'zod';
	import TagInput from '$lib/components/TagInput.svelte';
	import Password from '$lib/components/Password.svelte';
	import Loading from '$lib/components/Loading.svelte';
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
</script>

<Modal closeRoute="/">
	{#if loadingState}
		<Loading />
	{/if}
	<form
		method="POST"
		action={id === 'new' ? '?/add' : '?/edit'}
		autocomplete="off"
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
		<div class="p-4 ">
			{#if id}
				{#if !edit && !setDelete}
					<Button
						type="button"
						on:click={() => (edit = true)}
						color="hover:border-b-sky-500"
						text="EDIT"
					/>
					<Button
						type="button"
						on:click={() => (setDelete = true)}
						color="hover:border-b-red-500"
						text="DELETE"
					/>
				{:else if edit}
					<Button
						type="button"
						on:click={() => (edit = false)}
						color="hover:border-b-stone-500"
						text="CANCEL"
					/>
				{/if}
				{#if setDelete}
					<Button
						type="button"
						on:click={() => (setDelete = false)}
						color="hover:border-b-stone-500"
						text="CANCEL"
					/>
					<Button
						type="submit"
						formaction="?/delete"
						color="hover:border-b-red-500"
						text="CONFIRM DELETION"
					/>
				{/if}
			{/if}
		</div>
		<div id="input-container" class="pl-4 pr-4 space-y-4">
			<Input
				id="name"
				disabled={!edit}
				value={values.name}
				bind:inputValue={values.name}
				type="text"
				name="name"
				label="name"
				aria-label="Name"
				required
			/>
			<Input
				id="url"
				disabled={!edit}
				value={values.url}
				bind:inputValue={values.url}
				name="url"
				label="url"
				aria-label="Url"
				inputType="url"
			/>
			<div class="flex justify-between w-5/6">
				<Input
					id="username"
					disabled={!edit}
					value={values.username}
					bind:inputValue={values.username}
					name="username"
					label="username"
					aria-label="Username"
					containerClasses={!edit ? 'pb-2' : ''}
				/>

				<span class="mr-20">
					<CopyIcon
						on:keypress={() => alert('copy')}
						on:click={() => {
							handleCopytoClipBoard({
								message: `username copied to clipboard`,
								content: values.username
							});
						}}
					/>
				</span>
			</div>
			<Password {edit} disabled={!edit} bind:password={values.password} isModal={true} />
			<TagInput disabled={!edit} bind:tags={values.tags} />
			{#if edit}
				<div class="flex justify-center pt-10">
					<Button
						id="submit-login"
						type="submit"
						disabled={errors().length > 0}
						color="hover:border-b-sky-500"
						text="SAVE"
					/>
				</div>
			{/if}
		</div>
	</form>
</Modal>
