<script lang="ts">
	export let inputValue: string | number | undefined = undefined;
	export let inputType: 'input' | 'textarea' | 'password' = 'input';
	export let containerClasses = '';
</script>

{#if inputType === 'input'}
	<div class="relative {containerClasses} ">
		<input
			type="text"
			class=" {$$props.disabled
				? 'bg-white'
				: 'bg-gray-50 border-gray-300 border-b-2'} block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900  dark:bg-gray-700 border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
			placeholder=" "
			on:input
			{...$$props}
			{...$$restProps}
			bind:value={inputValue}
		/>
		<label
			for="floating_filled"
			class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
			>{$$props.label || ``}</label
		>
	</div>
{/if}
{#if inputType === 'password'}
	<div class="relative  {containerClasses}">
		<input
			type="password"
			class=" {$$props.disabled
				? 'bg-white'
				: 'bg-gray-50 border-gray-300 border-b-2'} block rounded-t-lg {$$props.isModal
				? 'px-2.5 pb-2.5 pt-5 w-full'
				: ''} text-sm text-gray-900  dark:bg-gray-700 border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
			placeholder=" "
			on:input
			{...$$props}
			{...$$restProps}
			bind:value={inputValue}
		/>
		<label
			for="floating_filled"
			class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
			>{$$props.label || ''}</label
		>
	</div>
{/if}
{#if inputType === 'textarea'}
	<div class="relative {containerClasses} ">
		<textarea
			class=" {$$props.disabled
				? 'bg-white'
				: 'bg-gray-50 border-gray-300 border-b-2'} block h-96 rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900  dark:bg-gray-700 border-0 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
			placeholder=" "
			on:input
			{...$$props}
			{...$$restProps}
			bind:value={inputValue}
		/>
		<label
			for="floating_filled"
			class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
			>{$$props.label || ``}</label
		>
	</div>
{/if}
