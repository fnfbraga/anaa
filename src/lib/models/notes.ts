import type { TypesEnum } from '$lib/schema';

export interface Note {
	id: string;
	name?: string;
	note?: string | null;
	tags?: Array<string | null> | null;
	type: TypesEnum.note;
}
