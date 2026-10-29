<script lang="ts">
	import CopyIcon from './CopyIcon.svelte';
	import ShowIcon from './ShowIcon.svelte';
	import { Input as UiInput } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { handleCopytoClipBoard } from '$lib/functions/copy-to-clipboard';
	import { cn } from '$lib/utils';

	export let isModal = true;
	export let password: string | undefined | null = '';
	export let edit = false;
	export let disabled = false;
	export let classes: string = '';

	let masked = true;

	function generateStrongPassword() {
		const chars =
			'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*()-_=+';
		const randomValues = new Uint32Array(18);
		if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
			crypto.getRandomValues(randomValues);
			password = Array.from(randomValues, (v) => chars[v % chars.length]).join('');
		} else {
			password = Array.from({ length: 18 }, () =>
				chars[Math.floor(Math.random() * chars.length)]
			).join('');
		}
		masked = false;
	}
</script>

{#if isModal}
	<div class={cn('w-full space-y-1.5', classes)}>
		<div class="flex items-center justify-between">
			<Label forId="password-input">Password</Label>
			{#if edit && !disabled}
				<Button
					type="button"
					variant="ghost"
					size="sm"
					on:click={generateStrongPassword}
					class="h-7 px-2 text-xs text-primary hover:text-primary"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-3.5 w-3.5 mr-1"
						aria-hidden="true"
					>
						<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
						<path d="M3 3v5h5" />
						<path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
						<path d="M16 16h5v5" />
					</svg>
					Generate strong
				</Button>
			{/if}
		</div>
		<div class="relative flex items-center gap-1.5">
			<div class="relative flex-1">
				<UiInput
					id="password-input"
					name="password"
					type={masked ? 'password' : 'text'}
					bind:value={password}
					on:input
					disabled={disabled}
					placeholder={edit ? 'Enter or generate password' : 'No password set'}
					class="font-mono pr-2"
				/>
			</div>
			<div class="flex items-center shrink-0">
				<ShowIcon
					{masked}
					on:click={() => (masked = !masked)}
				/>
				<CopyIcon
					disabled={!password}
					label="Copy password"
					on:click={() => {
						handleCopytoClipBoard({
							message: 'Password copied to clipboard',
							content: password
						});
					}}
				/>
			</div>
		</div>
	</div>
{:else}
	<div class={cn('inline-flex items-center gap-1 min-w-0 max-w-full', classes)}>
		<span
			class="font-mono text-xs text-muted-foreground truncate select-all px-2 py-1 rounded bg-muted/60 max-w-[140px]"
			aria-label={masked ? 'Password hidden' : 'Password visible'}
		>
			{#if !password}
				<span class="italic opacity-60">—</span>
			{:else if masked}
				••••••••••
			{:else}
				{password}
			{/if}
		</span>
		{#if password}
			<ShowIcon
				{masked}
				on:click={() => (masked = !masked)}
				class="h-8 w-8"
			/>
			<CopyIcon
				label="Copy password"
				on:click={() => {
					handleCopytoClipBoard({
						message: 'Password copied to clipboard',
						content: password
					});
				}}
				class="h-8 w-8"
			/>
		{/if}
	</div>
{/if}
