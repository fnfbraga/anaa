<script lang="ts">
	export let selected = false;
	export let href: string | undefined = undefined;

	$: classes = `inline-block hover:border-b-stone-500 hover:border-b-2 hover:-mb-0.5 p-2 rounded-t-md ${
		selected ? 'border-b-stone-500 border-b-2 -mb-0.5 bg-slate-100' : ''
	}`;
</script>

{#if href}
	<a {href} on:click class={classes}>
		<slot />
	</a>
{:else}
	<button type="button" on:click class={classes}>
		<slot />
	</button>
{/if}
