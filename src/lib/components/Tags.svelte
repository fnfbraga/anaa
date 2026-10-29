<script lang="ts">
	import Tag from './Tag.svelte';
	export let tags: Array<string | null> | undefined | null;
</script>

{#if tags && tags.filter(Boolean).length > 0}
	<div class="flex flex-wrap items-center gap-1.5" aria-label="Tags">
		{#each tags as tag}
			{#if tag}
				<Tag {tag} />
			{/if}
		{/each}
	</div>
{/if}
