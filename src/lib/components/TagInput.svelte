<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';

	export let tags: string[] = [];
	export let disabled = false;
	let tagInput = '';

	function addCurrentTag() {
		const trimmed = tagInput.trim();
		if (!trimmed) return;
		const existing = Array.isArray(tags) ? tags.filter(Boolean) : [];
		tags = [...new Set([...existing, trimmed])];
		tagInput = '';
	}

	const handleKeydown = (e: KeyboardEvent) => {
		if (!tagInput && e.key === 'Backspace' && Array.isArray(tags) && tags.length > 0) {
			tags = tags.slice(0, -1);
			return;
		}
		if ((e.key === 'Enter' || e.key === ',') && tagInput.trim().length > 0) {
			e.preventDefault();
			addCurrentTag();
		}
	};

	const removeTag = (index: number) => {
		if (disabled) return;
		tags = (tags || []).filter((_, i) => index !== i);
	};
</script>

<div class="space-y-2">
	<Label forId="tag-input">Tags</Label>
	<div
		class="flex flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-3 py-2 min-h-[44px] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 {disabled
			? 'opacity-70 bg-muted/40'
			: ''}"
	>
		{#if tags && tags.filter(Boolean).length > 0}
			{#each tags as tag, index}
				{#if tag}
					<input type="hidden" name="tags" value={tag} />
					<Tag
						{tag}
						id={`tag: ${tag}`}
						edit={!disabled}
						on:click={() => removeTag(index)}
					/>
				{/if}
			{/each}
		{:else if disabled}
			<span class="text-sm text-muted-foreground italic">No tags</span>
		{/if}

		{#if !disabled}
			<div class="flex flex-1 items-center gap-2 min-w-[160px]">
				<input
					id="tag-input"
					type="text"
					placeholder={tags?.length ? 'Add another tag...' : 'Type a tag and press Enter...'}
					bind:value={tagInput}
					on:keydown={handleKeydown}
					class="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none py-0.5"
				/>
				{#if tagInput.trim().length > 0}
					<Button
						type="button"
						variant="secondary"
						size="sm"
						class="h-7 px-2.5 text-xs"
						on:click={addCurrentTag}
					>
						Add
					</Button>
				{/if}
			</div>
		{/if}
	</div>
</div>
