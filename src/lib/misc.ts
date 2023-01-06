import type { Modifier, OptionsGeneric } from '@popperjs/core/lib/types';

type PopperOptions<TModifier> = Partial<OptionsGeneric<TModifier>> | undefined;

export const popperOptions: PopperOptions<Partial<Modifier<any, any>>> = {
	placement: 'top-start',
	strategy: 'fixed',
	modifiers: [{ name: 'offset', options: { offset: [0, 5] } }]
};
