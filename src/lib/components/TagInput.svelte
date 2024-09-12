<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';

	export let tags = [] as any;
	export let disabled = false;
	let tagInput: string | undefined;

	const handleChange = (e: KeyboardEvent) => {
		if (!tagInput && e.code === 'Backspace') {
			tags =
				tags?.length === 1 ? [] : tags?.filter((_: any, i: number) => i < (tags?.length || 0) - 1);
		}
		if (tagInput && tagInput.trim().length > 0 && e.code === 'Enter') {
			e.preventDefault();
			tags = tags?.length ? [...new Set([...tags, tagInput.trim()])] : [tagInput.trim()];
			tagInput = undefined;
		}
	};

	const removeTag = (e: any, index: number) =>
		(e.pointerType === 'mouse' || e.pointerType === 'touch') &&
		(tags = tags?.filter((_: any, i: number) => index !== i));
</script>

<p class="ml-2 text-xs text-gray-500">tags</p>
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="flex items-center p-1 rounded-md {!disabled
		? 'border-2'
		: ''} mt-2 focus:outline-1 focus:text-gray-900 w-full h-9"
	on:keydown={handleChange}
>
	{#if tags}
		{#each tags as tag, index}
			{#if tag}
				<Tag
					{tag}
					id={`tag: ${tag || ''}`}
					edit={!disabled}
					on:click={(e) => {
						removeTag(e, index);
					}}
				/>
			{/if}
		{/each}
	{/if}
	{#if !disabled}
		<input
			id="tag-input"
			placeholder="Write tag and press Enter to add tag"
			bind:value={tagInput}
			class="text-sm w-full focus:outline-0"
		/>
	{/if}
</div>
