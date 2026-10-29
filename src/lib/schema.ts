export enum TypesEnum {
	login = 'login',
	note = 'note'
}

export interface Item {
	id: number;
	name: string;
	type: 'login' | 'note';
	url: string | null;
	username: string | null;
	password: string | null;
	note: string | null;
	favorite: string | null;
	tags: string[] | null;
}
