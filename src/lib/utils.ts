import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export type ClassValue =
	| ClassArray
	| ClassDictionary
	| string
	| number
	| bigint
	| null
	| boolean
	| undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

function toVal(mix: ClassValue): string {
	let k: number | string;
	let y: string;
	let str = '';

	if (typeof mix === 'string' || typeof mix === 'number') {
		str += mix;
	} else if (typeof mix === 'object' && mix !== null) {
		if (Array.isArray(mix)) {
			const len = mix.length;
			for (k = 0; k < len; k++) {
				if (mix[k]) {
					y = toVal(mix[k]);
					if (y) {
						if (str) str += ' ';
						str += y;
					}
				}
			}
		} else {
			for (k in mix) {
				if (mix[k]) {
					if (str) str += ' ';
					str += k;
				}
			}
		}
	}

	return str;
}

export function cn(...inputs: ClassValue[]): string {
	let i = 0;
	let tmp: ClassValue;
	let x: string;
	let str = '';
	const len = inputs.length;
	for (; i < len; i++) {
		tmp = inputs[i];
		if (tmp) {
			x = toVal(tmp);
			if (x) {
				if (str) str += ' ';
				str += x;
			}
		}
	}
	return str;
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number]
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (styleObj: Record<string, number | string | undefined>): string => {
		return Object.keys(styleObj).reduce((str, key) => {
			if (styleObj[key] === undefined) return str;
			return str + `${key}:${styleObj[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};
