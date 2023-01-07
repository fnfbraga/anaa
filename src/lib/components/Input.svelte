<script lang="ts">
	export let inputValue: string | number | undefined = undefined;
	export let inputType: 'input' | 'textarea' = 'input';
	export let classes: string | undefined = undefined;
	export let required = false;
	$: defaultClasses = `p-1 rounded-md border-2 mt-2 focus:outline-1 focus:text-gray-900 w-full ${classes} ${
		required && !inputValue ? 'border-orange-500 focus:outline-0' : ''
	}`;
</script>

{#if inputType === 'input'}
	<input bind:value={inputValue} {...$$props} {...$$restProps} on:input class={defaultClasses} />
{/if}
{#if inputType === 'textarea'}
	<textarea bind:value={inputValue} {...$$props} {...$$restProps} on:input class={defaultClasses} />
{/if}
