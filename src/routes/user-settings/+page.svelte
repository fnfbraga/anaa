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
</script>

<Modal closeRoute="/">
	{#if data?.responseData && data.responseData.length > 0}
		<form class="p-4" method="post" on:submit={() => (loading = true)}>
			<Button disabled={loading} formaction="?/deleteFile"
				>{loading ? 'Deleting File...' : 'Delete File'}</Button
			>
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
