<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Input from '$lib/components/Input.svelte';
	import { z } from 'zod';
	import Tag from '$lib/components/Tag.svelte';
	import { createPopperActions } from 'svelte-popperjs';
	import { popperOptions } from '$lib/misc';

	const Note = z.object({
		name: z.string().min(1),
		note: z.string().optional(),
		tags: z.array(z.string()).optional()
	});
	type NoteType = z.infer<typeof Note>;
	type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
	type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

	$: values = {
		name: undefined,
		note: undefined,
		tags: []
	} as PartialBy<NoteType, 'name'>;
	$: errors = () => {
		let error: Array<any> = [];
		try {
			Note.parse(values);
			error = [];
			return error;
		} catch (e) {
			error.push(e);
			return error;
		}
	};
	let tagInput: string | undefined;

	const removeTag = (e: any, index: number) =>
		(e.pointerType === 'mouse' || e.pointerType === 'touch') &&
		(values.tags = values.tags?.filter((_, i) => index !== i));

	const handleChange = (e: KeyboardEvent) => {
		if (!tagInput && e.code === 'Backspace') {
			values.tags =
				values.tags?.length === 1
					? []
					: values.tags?.filter((_, i) => i < (values.tags?.length || 0) - 1);
		}
		if (tagInput && tagInput.trim().length > 0 && e.code === 'Enter') {
			values.tags = values.tags?.length ? [...values.tags, tagInput] : [tagInput];
			tagInput = undefined;
		}
	};
</script>

<Modal closeRoute="/">
	<form autocomplete="off">
		<div id="input-container" class="pl-4 pr-4 space-y-4">
			<Input
				value={values.name}
				bind:inputValue={values.name}
				type="text"
				name="name"
				placeholder="Name"
				aria-label="Name"
				required
			/>
			<Input
				value={values.note}
				bind:inputValue={values.note}
				classes=" bg-stone-100"
				inputType="textarea"
				name="note"
				placeholder="Note"
				aria-label="Note"
			/>
			<div
				class="flex items-center p-1 rounded-md border-2 mt-2 focus:outline-1 focus:text-gray-900 w-full h-9"
				on:keydown={handleChange}
			>
				{#if values.tags}
					{#each values.tags as tag, index}
						<Tag
							{tag}
							edit
							on:click={(e) => {
								removeTag(e, index);
							}}
						/>
					{/each}
				{/if}
				<input
					placeholder="Write tag and press Enter to add tag"
					bind:value={tagInput}
					class="w-full focus:outline-0"
				/>
			</div>
			<div class="flex justify-center pt-10">
				<Button
					disabled={errors().length > 0}
					color="hover:border-b-sky-500"
					text="SUBMIT"
					on:click={() => console.log(values)}
				/>
			</div>
		</div>
	</form>
</Modal>
