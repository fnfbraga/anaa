<script lang="ts">
	import { popperOptions } from '$lib/misc';
	import { createPopperActions } from 'svelte-popperjs';
	import CopyIcon from './CopyIcon.svelte';
	import ShowIcon from './ShowIcon.svelte';
	import Input from './Input.svelte';

	const [passwordRef, popperPasswordContent] = createPopperActions(popperOptions);
	export let password: string | undefined;
	export let edit = false;

	let showTooltip = false;
	const mask = '********';
	let masked = true;
</script>

<span>
	<p class="font-normal from-neutral text-sm">PASSWORD</p>
	<span class="flex items-center h-6 ">
		<p
			class="truncate font-mono"
			on:mouseover={() => (showTooltip = true)}
			on:focus={() => (showTooltip = true)}
			on:mouseleave={() => (showTooltip = false)}
			use:passwordRef
		>
			{#if showTooltip && !masked}
				<div class="bg-black p-2 rounded-md text-white" id="tooltip" use:popperPasswordContent>
					{password}
				</div>
			{/if}
			{#if edit}
				<Input on:input inputValue={password} />
			{:else if masked}
				{mask}
			{:else}
				{password}
			{/if}
		</p>
		<ShowIcon {masked} on:click={() => (masked = !masked)} on:keypress={() => (masked = !masked)} />
		<CopyIcon
			on:keypress={() => alert('copy')}
			on:click={() => {
				navigator.clipboard.writeText(password || '');
				alert(`copied ${password}`);
			}}
		/>
	</span>
</span>
