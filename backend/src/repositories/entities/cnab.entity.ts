import { ICnab, ICnabData } from 'src/repositories/types';

export class Cnab implements ICnab {
	id?: number;
	type: number;
	date: Date;
	value: number;
	cpf: string;
	card: string;
	owner: string;
	store: string;

	constructor(data: ICnabData, id?: number) {
		this.id = id;
		this.type = data.type;
		this.date = new Date(`${data.date}T${data.time}`);
		this.value = data.value;
		this.cpf = data.cpf;
		this.card = data.card;
		this.owner = data.owner;
		this.store = data.store;
	}


}
