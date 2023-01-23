<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { handleCopytoClipBoard } from '$lib/functions/copy-to-cllipboard';
	import type { ActionData, PageData } from './$types';
	$: clientEmail = $page.data.clientEmail;
	const emailId = 'service-account-email';

	function handleCopy() {
		const text = document.getElementById(emailId)?.innerText;
		handleCopytoClipBoard({ message: `${text} copied to clipboard`, elementId: emailId });
	}
	export let data: PageData;
	export let form: ActionData;
	$: loading = false;
	$: folder = data.responseData;
	let deleteFile = false;
</script>

<Modal closeRoute="/">
	{#if data?.responseData}
		<p>
			You have shared the folder <strong
				><a href={`https://drive.google.com/file/d/${folder?.id}`} target="_blank" rel="noreferrer"
					>{folder?.name}</a
				></strong
			> with this app
		</p>
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
