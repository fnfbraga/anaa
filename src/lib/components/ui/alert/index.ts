import { cn } from '$lib/utils';
import Root from './alert.svelte';

export type Variant = 'default' | 'destructive' | 'warning' | 'success';

const baseClasses =
	'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4';

const variantClasses: Record<Variant, string> = {
	default: 'bg-background text-foreground border-border [&>svg]:text-foreground',
	destructive:
		'border-destructive/50 bg-destructive/10 text-destructive dark:border-destructive [&>svg]:text-destructive',
	warning:
		'border-amber-500/50 bg-amber-500/10 text-amber-800 dark:text-amber-300 [&>svg]:text-amber-600',
	success:
		'border-emerald-500/50 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 [&>svg]:text-emerald-600'
};

export function alertVariants({
	variant = 'default',
	className = ''
}: {
	variant?: Variant;
	className?: string;
} = {}) {
	return cn(baseClasses, variantClasses[variant], className);
}

export { Root, Root as Alert };
