<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { handleCopytoClipBoard } from '$lib/functions/copy-to-clipboard';
	import type { ActionData, PageData } from './$types';
	$: clientEmail = $page.data.clientEmail;
	const emailId = 'service-account-email';

	function handleCopy() {
		const text = document.getElementById(emailId)?.innerText;
		handleCopytoClipBoard({ message: `${text} copied to clipboard`, elementId: emailId });
	}
	export let data: PageData;
	const keys = [
		'kind',
		'id',
		'createdTime',
		'modifiedTime',
		'modifiedByMeTime',
		'name',
		'version',
		'size'
	];
	const details = Object.entries(data.responseData || {})
		.map(([key, value]) => (keys.includes(key) ? { [key]: value } : null))
		.filter(Boolean);
	export let form: ActionData;
	$: loading = false;
	$: folder = data.responseData;
	let deleteFile = false;
</script>

<Modal closeRoute="/">
	{#if data?.responseData}
		<div class="p-6">
			<p class="mb-4 ml-6">
				You have shared the folder <strong
					><a
						href={`https://drive.google.com/file/d/${folder?.id}`}
						target="_blank"
						rel="noreferrer">{folder?.name}</a
					></strong
				> with this app
			</p>
			<ul class="ml-6">
				{#each details as detail}
					<li><strong>{Object.keys(detail || {})[0]}</strong>: {Object.values(detail || {})[0]}</li>
				{/each}
			</ul>
			<form class="p-4" method="post" on:submit={() => (loading = true)}>
				{#if deleteFile}
					<Button color="hover:border-b-orange-500" disabled={loading} formaction="?/deleteFile"
						>{loading ? 'Deleting File...' : 'Confirm Delete File'}</Button
					>
					{#if !loading}
						<Button on:click={() => (deleteFile = false)}>Cancel File</Button>
					{/if}
				{:else}
					<Button on:click={() => (deleteFile = true)}>Delete File</Button>
				{/if}
			</form>
			<p class="text-lg font-semibold ml-6">Upcoming features</p>
			<ul class="ml-6">
				<li>PWA</li>
				<li>Password generator</li>
				<li>upload json</li>
				<li>download json</li>
				<li>Autocomplete for Tags Input</li>
			</ul>
		</div>
	{:else}
		<form class="p-4" method="post" on:submit={() => (loading = true)}>
			<ul>
				<li class="p-2">
					<strong>STEP 1:</strong> create a folder in your google drive and share it with the
					following email address:
					<u on:click={handleCopy} on:keypress={handleCopy} id={emailId} class="cursor-pointer"
						>{clientEmail}</u
					>
				</li>
				<li class="p-2">
					<strong>STEP 2:</strong> click here to create file:
					<Button disabled={loading} formaction="?/createFile"
						>{loading ? 'Creating File...' : 'Create File'}</Button
					>
				</li>
			</ul>
		</form>
	{/if}
</Modal>
