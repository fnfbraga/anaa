<script lang="ts">
	import Tag from './Tag.svelte';
	export let tags: Array<string> | undefined;
</script>

{#if tags}
	<span class="flex flex-wrap space-x-1">
		{#each tags as tag}
			<Tag {tag} />
		{/each}
	</span>
{/if}
