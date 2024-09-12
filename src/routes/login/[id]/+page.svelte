<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Input from '$lib/components/Input.svelte';
	import { z } from 'zod';
	import TagInput from '$lib/components/TagInput.svelte';
	import Password from '$lib/components/Password.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { goto } from '$app/navigation';
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
		name: data.name,
		url: data.url || '',
		username: data.username,
		password: data.password,
		tags: data.tags,
		favorite: data.favorite
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

	$: console.info(errors());

	const handleSubmit = async () => {
		try {
			if (id === 'new') {
				const form = new FormData();
				form.append('data', JSON.stringify(values));
				await fetch(`?/add`, { method: 'POST', body: form });
			} else {
				const form = new FormData();
				form.append('data', JSON.stringify({ ...values, id }));
				await fetch(`?/edit`, { method: 'POST', body: form });
			}
			alerts.update((alerts) => [
				...alerts,
				{
					type: AlertEnum.info,
					message:
						id === 'new'
							? `login created successfully`
							: `login ${values.name} updated successfully`,
					createdOn: new Date().getTime()
				}
			]);
			await goto('/');
		} catch (err) {
			alerts.update((alerts) => [
				...alerts,
				{
					type: AlertEnum.error,
					message: `Something went wrong creating/updating login `,
					createdOn: new Date().getTime()
				}
			]);
		}
	};

	const handleDelete = async () => {
		try {
			const form = new FormData();
			form.append('id', id);
			await fetch(`?/delete`, { method: 'POST', body: form });
			alerts.update((alerts) => [
				...alerts,
				{
					type: AlertEnum.info,
					message: `login ${values.name} deleted successfully`,
					createdOn: new Date().getTime()
				}
			]);
			await goto('/');
		} catch (err) {
			alerts.update((alerts) => [
				...alerts,
				{
					type: AlertEnum.error,
					message: `Something went wrong deleting login ${id}`,
					createdOn: new Date().getTime()
				}
			]);
		}
	};
</script>

<Modal closeRoute="/">
	{#if loadingState}
		<Loading />
	{/if}
	<form autocomplete="off">
		<div class="p-4 ">
			{#if id}
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
			<Password {edit} disabled={!edit} bind:password={values.password} isModal={true} />
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
