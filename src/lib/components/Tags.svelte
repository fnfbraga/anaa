<script lang="ts">
	import Tag from './Tag.svelte';
	export let tags: Array<string> | undefined;
</script>

<p class="font-normal from-neutral text-sm mb-1">TAGS</p>
<span class="flex">
	{#if tags}
		{#each tags as tag}
			<Tag {tag} />
		{/each}
	{/if}
</span>
