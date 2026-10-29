<script lang="ts">
	import { Input as UiInput } from '$lib/components/ui/input';
	import { Textarea as UiTextarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';

	export let inputValue: string | number | undefined | null = '';
	export let inputType: 'input' | 'textarea' | 'url' | 'password' = 'input';
	export let type: string | undefined = undefined;
	export let containerClasses = '';
	export let label: string = '';
	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let disabled = false;
	export let required = false;
	export let isModal = true;
	export let classes = '';

	$: inputId = id || name || `field-${label || 'input'}`;
	$: formattedLabel = label ? label.charAt(0).toUpperCase() + label.slice(1) : '';
	$: resolvedType =
		inputType === 'url'
			? 'url'
			: inputType === 'password'
			? 'password'
			: type || 'text';
</script>

<div class={cn('w-full space-y-1.5', containerClasses)}>
	{#if formattedLabel}
		<Label forId={inputId} class="inline-flex items-center gap-1">
			<span>{formattedLabel}</span>
			{#if required && !disabled}
				<span class="text-destructive" aria-hidden="true">*</span>
			{/if}
		</Label>
	{/if}

	{#if inputType === 'textarea'}
		<UiTextarea
			{...$$restProps}
			id={inputId}
			{name}
			{disabled}
			{required}
			bind:value={inputValue}
			on:input
			class={cn('min-h-[180px] resize-y leading-relaxed font-mono text-sm', classes)}
		/>
	{:else}
		<UiInput
			{...$$restProps}
			id={inputId}
			{name}
			type={resolvedType}
			{disabled}
			{required}
			bind:value={inputValue}
			on:input
			class={cn(!isModal && 'h-9 text-xs', inputType === 'password' && 'font-mono', classes)}
		/>
	{/if}
</div>
