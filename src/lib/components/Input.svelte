<script lang="ts">
	export let inputValue: string | number | undefined = undefined;
	export let inputType: 'input' | 'textarea' | 'password' = 'input';
	export let classes: string | undefined = undefined;
	export let required = false;
	$: defaultClasses = `p-1 rounded-md border-2 mt-2 focus:outline-1 focus:text-gray-900 w-full ${classes} ${
		required && !inputValue ? 'border-orange-500 focus:outline-0' : ''
	}`;
</script>

{#if inputType === 'input'}
	<label class="text-sm text-stone-500">
		{$$props.label || ''}
		<input bind:value={inputValue} {...$$props} {...$$restProps} on:input class={defaultClasses} />
	</label>
{/if}
{#if inputType === 'password'}
	<label class="text-sm text-stone-500">
		{$$props.label || ''}
		<input
			type="password"
			bind:value={inputValue}
			{...$$props}
			{...$$restProps}
			on:input
			class={defaultClasses}
		/>
	</label>
{/if}
{#if inputType === 'textarea'}
	<label class="text-sm text-stone-500 pt-10">
		{$$props.label || ''}
		<textarea
			bind:value={inputValue}
			{...$$props}
			{...$$restProps}
			on:input
			class={defaultClasses}
		/>
	</label>
{/if}
