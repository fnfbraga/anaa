<script lang="ts">
	export let tags: Array<string> | undefined;
</script>

<span>
	<p class="font-normal from-neutral text-sm mb-1">TAGS</p>
	{#if tags}
		{#each tags as tag}
			<span class="bg-sky-300 rounded-full mr-1 p-1.5 px-2 text-sm">{tag}</span>
		{/each}
	{/if}
</span>
