import type { ItemType } from './misc';

export interface Note {
	uuid: string;
	name?: string;
	note?: string;
	tags?: Array<string>;
	type: ItemType.note;
}
