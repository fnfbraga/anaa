<script lang="ts">
	import type { Login } from '$lib/models/logins';
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
					<button
						on:click={() => (edit = true)}
						class="hover:border-b-sky-500 hover:border-b-2 -pb-4 hover:-mb-0.5 "
					>
						EDIT
					</button>
				{:else}
					<button
						on:click={() => console.log(updatedValues)}
						class="hover:border-b-green-500 hover:border-b-2 hover:-mb-0.5"
					>
						SAVE
					</button>
					<button
						on:click={() => (edit = false)}
						class="hover:border-b-stone-500 hover:border-b-2 hover:-mb-0.5"
					>
						CANCEL
					</button>
				{/if}
				<button on:click class="hover:border-b-red-500 hover:border-b-2 hover:-mb-0.5">
					DELETE
				</button>
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
