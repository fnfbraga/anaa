import { cn } from '$lib/utils';
import Root from './button.svelte';

export type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type Size = 'default' | 'sm' | 'lg' | 'icon';

const baseClasses =
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]';

const variantClasses: Record<Variant, string> = {
	default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
	destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
	outline:
		'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
	secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
	ghost: 'hover:bg-accent hover:text-accent-foreground',
	link: 'text-primary underline-offset-4 hover:underline'
};

const sizeClasses: Record<Size, string> = {
	default: 'h-10 px-4 py-2 min-h-[40px]',
	sm: 'h-9 rounded-md px-3 text-xs min-h-[36px]',
	lg: 'h-11 rounded-md px-8 text-base min-h-[44px]',
	icon: 'h-10 w-10 min-h-[40px] min-w-[40px]'
};

export function buttonVariants({
	variant = 'default',
	size = 'default',
	className = ''
}: {
	variant?: Variant;
	size?: Size;
	className?: string;
} = {}) {
	return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
}

export { Root, Root as Button };
