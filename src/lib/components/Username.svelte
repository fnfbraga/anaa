<script lang="ts">
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
	{#if showTooltip}
		<div class="bg-black p-2 rounded-md text-white" id="tooltip" use:popperUsernameContent>
			{username}
		</div>
	{/if}
	<p class="font-normal from-neutral text-sm">USERNAME</p>
	<span class="flex items-center h-6 ">
		<p class="truncate" use:usernameRef>
			{#if edit}
				<Input
					on:input
					inputValue={username}
					class="p-1 rounded-md border-2 mt-2 focus:outline-1 focus:text-gray-900"
				/>
			{:else}
				{username}
			{/if}
		</p>
		<CopyIcon
			on:keypress={() => alert('copy')}
			on:click={() => {
				navigator.clipboard.writeText(username || '');
				alert(`copied ${username}`);
			}}
		/>
	</span>
</span>
