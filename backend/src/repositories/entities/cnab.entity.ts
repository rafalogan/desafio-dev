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

	constructor(data: ICnabData | ICnab, id?: number) {
		this.id = ('id' in data) ? data.id : id;
		this.type = data.type;
		this.date =  ('time' in data) ? new Date(`${data.date}T${data.time}`) : new Date(data.date);
		this.value = data.value;
		this.cpf = data.cpf;
		this.card = data.card;
		this.owner = data.owner;
		this.store = data.store;
	}


}
