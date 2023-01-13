<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Input from '$lib/components/Input.svelte';
	import { z } from 'zod';
	import TagInput from '$lib/components/TagInput.svelte';

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
</script>

<Modal closeRoute="/">
	<form autocomplete="off">
		<div id="input-container" class="pl-4 pr-4 space-y-4">
			<Input
				value={values.name}
				bind:inputValue={values.name}
				type="text"
				name="name"
				id="name"
				placeholder="Name"
				aria-label="Name"
				required
			/>
			<Input
				id="note"
				value={values.note}
				bind:inputValue={values.note}
				classes=" bg-stone-100"
				inputType="textarea"
				name="note"
				placeholder="Note"
				aria-label="Note"
			/>
			<TagInput bind:tags={values.tags} />
			<div class="flex justify-center pt-10">
				<Button
					id="submit-note"
					disabled={errors().length > 0}
					color="hover:border-b-sky-500"
					text="SUBMIT"
					on:click={() => console.log(values)}
				/>
			</div>
		</div>
	</form>
</Modal>
