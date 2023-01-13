<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Input from '$lib/components/Input.svelte';
	import { z } from 'zod';
	import TagInput from '$lib/components/TagInput.svelte';
	import Password from '$lib/components/Password.svelte';

	const Login = z.object({
		name: z.string().min(1),
		url: z.string().optional(),
		username: z.string().optional(),
		password: z.string().optional(),
		tags: z.array(z.string()).optional()
	});
	type LoginType = z.infer<typeof Login>;
	type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
	type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

	$: values = {
		name: undefined,
		url: undefined,
		username: undefined,
		password: undefined,
		tags: []
	} as PartialBy<LoginType, 'name'>;
	$: errors = () => {
		let error: Array<any> = [];
		try {
			Login.parse(values);
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
				id="name"
				value={values.name}
				bind:inputValue={values.name}
				type="text"
				name="name"
				placeholder="Name"
				aria-label="Name"
				required
			/>
			<Input
				id="url"
				value={values.url}
				bind:inputValue={values.url}
				name="url"
				placeholder="Url"
				aria-label="Url"
			/>
			<Input
				id="username"
				value={values.username}
				bind:inputValue={values.username}
				name="username"
				placeholder="Username"
				aria-label="Username"
			/>
			<Password edit bind:password={values.password} />
			<TagInput bind:tags={values.tags} />
			<div class="flex justify-center pt-10">
				<Button
					id="submit-login"
					disabled={errors().length > 0}
					color="hover:border-b-sky-500"
					text="SUBMIT"
					on:click={() => console.log(values)}
				/>
			</div>
		</div>
	</form>
</Modal>
