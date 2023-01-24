import type { ItemType } from './misc';

export interface Login {
	type: ItemType.login;
	uuid: string;
	name?: string;
	url?: string;
	username?: string;
	password?: string;
	tags?: Array<string>;
}
