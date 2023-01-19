<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';

	export let tags: Array<string | null> = [];
	let tagInput: string | undefined;

	const handleChange = (e: KeyboardEvent) => {
		if (!tagInput && e.code === 'Backspace') {
			tags = tags?.length === 1 ? [] : tags?.filter((_, i) => i < (tags?.length || 0) - 1);
		}
		if (tagInput && tagInput.trim().length > 0 && e.code === 'Enter') {
			tags = tags?.length ? [...tags, tagInput] : [tagInput];
			tagInput = undefined;
		}
	};

	const removeTag = (e: any, index: number) =>
		(e.pointerType === 'mouse' || e.pointerType === 'touch') &&
		(tags = tags?.filter((_, i) => index !== i));
</script>

<div
	class="flex items-center p-1 rounded-md border-2 mt-2 focus:outline-1 focus:text-gray-900 w-full h-9"
	on:keydown={handleChange}
>
	{#if tags}
		{#each tags as tag, index}
			{#if tag}
				<Tag
					{tag}
					id={`tag: ${tag || ''}`}
					edit
					on:click={(e) => {
						removeTag(e, index);
					}}
				/>
			{/if}
		{/each}
	{/if}
	<input
		id="tag-input"
		placeholder="Write tag and press Enter to add tag"
		bind:value={tagInput}
		class="text-sm w-full focus:outline-0"
	/>
</div>
