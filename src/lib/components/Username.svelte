<script lang="ts">
	import { handleCopytoClipBoard } from '$lib/functions/copy-to-cllipboard';
	import { popperOptions } from '$lib/misc';
	import { createPopperActions } from 'svelte-popperjs';
	import CopyIcon from './CopyIcon.svelte';
	import Input from './Input.svelte';

	const [usernameRef, popperUsernameContent] = createPopperActions(popperOptions);
	export let username: string | undefined;
	export let edit = false;

	let showTooltip = false;
</script>

<span
	on:mouseover={() => (showTooltip = true)}
	on:focus={() => (showTooltip = true)}
	on:mouseleave={() => (showTooltip = false)}
>
	{#if showTooltip && username}
		<div class="bg-black p-2 rounded-md text-white" id="tooltip" use:popperUsernameContent>
			{username}
		</div>
	{/if}
	<span class="flex items-center h-6">
		<p class="truncate w-3/4" use:usernameRef>
			{#if edit}
				<div class="mt-16">
					<Input label="username" on:input inputValue={username} />
				</div>
			{:else}
				<p class="text-xs">{username}</p>
			{/if}
		</p>
		<span class={edit ? 'mt-16' : ''}>
			<CopyIcon
				disabled={!username}
				on:keypress={() =>
					handleCopytoClipBoard({ message: `username copied to clipboard`, content: username })}
				on:click={() => {
					handleCopytoClipBoard({ message: `username copied to clipboard`, content: username });
				}}
			/>
		</span>
	</span>
</span>
