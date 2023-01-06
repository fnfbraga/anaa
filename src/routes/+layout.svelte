<script>
	import Fab from '$lib/components/FAB.svelte';
	import Header from '$lib/components/Header.svelte';
	import githubLogo from '$lib/images/github.svg';
	import '../app.css';
</script>

<div class="flex flex-col h-screen justify-between align-middle ">
	<Header />
	<main class="mb-auto h-10 ">
		<slot />
		<Fab />
	</main>

	<footer class="h-6 flex justify-center ">
		<img src={githubLogo} alt="GitHub Logo" class="h-3" />
		<p class="text-xs">
			Made by
			<a class="font-medium hover:underline" href="https://github.com/fnfbraga"> FB</a>
		</p>
	</footer>
</div>
