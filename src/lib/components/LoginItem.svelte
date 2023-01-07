<script lang="ts">
	import type { Login } from '$lib/models/logins';
	import Button from './Button.svelte';
	import Modal from './Modal.svelte';
	import Name from './Name.svelte';
	import Password from './Password.svelte';
	import Tags from './Tags.svelte';
	import Url from './Url.svelte';
	import Username from './Username.svelte';

	export let login: Login;
	type LoginKey = keyof Login;
	let updatedValues = login;
	let edit = false;

	const handleUpdate = (key: LoginKey, value: string | Array<string>) => {
		if (key === 'tags' && Array.isArray(value)) {
			updatedValues.tags = value;
		}
		if (key !== 'tags' && typeof value === 'string') {
			updatedValues[key] = value;
		}
	};

	const handleChange = (key: LoginKey, e: any) => {
		handleUpdate(key, e.target?.value);
	};

	let showModal = false;
</script>

{#if showModal}
	<Modal on:close={() => (showModal = false)}>
		<div class="flex flex-col space-y-4 p-4">
			<span class="self-center space-x-4">
				{#if !edit}
					<Button on:click={() => (edit = true)} color="hover:border-b-sky-500" text="EDIT" />
				{:else}
					<Button
						on:click={() => console.log(updatedValues)}
						color="hover:border-b-green-500"
						text="SAVE"
					/>
					<Button on:click={() => (edit = false)} color="hover:border-b-stone-500" text="CANCEL" />
				{/if}
				<Button
					on:click={() => console.log('delete')}
					color="hover:border-b-red-500"
					text="DELETE"
				/>
			</span>
			<Name
				on:input={(e) => handleChange('name', e)}
				{edit}
				name={login.name}
				handleShowModal={() => (showModal = true)}
			/>
			<Url on:input={(e) => handleChange('url', e)} {edit} url={login.url} />
			<Username on:input={(e) => handleChange('username', e)} {edit} username={login.username} />
			<Password on:input={(e) => handleChange('password', e)} {edit} password={login.password} />
			<Tags on:input={(e) => handleChange('tags', e)} tags={login.tags} />
		</div>
	</Modal>
{/if}

<div class="flex w-11/12 m-2 space-x-4 rounded shadow p-4 pl-8 hover:shadow-md">
	<span class="w-1/6 lg:w-1/6 p-2 text-xs cursor-pointer">
		<Name name={login.name} handleShowModal={() => (showModal = true)} />
	</span>
	<span class="w-1/6 lg:w-1/5 p-2 text-xs font-mono hidden lg:block">
		<Url url={login.url} />
	</span>
	<span class="w-2/6 lg:w-1/5 p-2 text-xs">
		<Username username={login.username} />
	</span>
	<span class="w-2/6 lg:w-1/5 p-2 text-xs">
		<Password password={login.password} />
	</span>
	<span class="w-1/6 lg:w-1/5 p-2 text-xs hidden sm:block">
		<Tags tags={login.tags} />
	</span>
</div>
