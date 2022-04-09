export interface ICnabData {
	type: number;
	date: string;
	value: number;
	cpf: string;
	card: string;
	time: string;
	owner: string;
	store: string;
}

export interface ICnab {
	id?: number;
	type: number;
	date: Date;
	value: number;
	cpf: string;
	card: string;
	owner: string;
	store: string;
	userId?: number;
}
