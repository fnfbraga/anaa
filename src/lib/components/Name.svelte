<script lang="ts">
	import Input from './Input.svelte';

	export let name: string | undefined;
	export let href: string | undefined = undefined;
	export let handleShowModal: (() => void) | undefined = undefined;
	export let edit = false;
</script>

<div class="min-w-0">
	{#if edit}
		<Input label="name" on:input inputValue={name} />
	{:else if href}
		<a
			{href}
			on:click={handleShowModal}
			class="text-base font-semibold text-foreground hover:text-primary transition-colors truncate block focus-visible:outline-none focus-visible:underline"
			title={name}
		>
			{name}
		</a>
	{:else}
		<span class="text-base font-semibold text-foreground truncate block" title={name}>
			{name}
		</span>
	{/if}
</div>
