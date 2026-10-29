<script lang="ts">
	import githubLogo from '$lib/images/github.svg';
</script>

<footer class="mt-auto border-t border-border/60 bg-card/50 py-4 px-4">
	<div class="container mx-auto flex items-center justify-between text-xs text-muted-foreground max-w-5xl">
		<div class="flex items-center gap-2">
			<span class="inline-flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-primary font-bold text-[10px]">
				A
			</span>
			<span>ANAA Vault &middot; Encrypted Password &amp; Note Manager</span>
		</div>
		<a
			class="inline-flex items-center gap-1.5 font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1.5 py-0.5"
			href="https://github.com/fnfbraga"
			target="_blank"
			rel="noopener noreferrer"
		>
			<img src={githubLogo} alt="" aria-hidden="true" class="h-3.5 w-3.5 dark:invert opacity-75" />
			<span>Made by FB</span>
		</a>
	</div>
</footer>
