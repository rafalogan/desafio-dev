import { AbstractDbService } from 'src/core';
import { Knex } from 'knex';

import { ENTRY_TYPES, existsOrError, OUT_TYPES } from 'src/utils';
import { Cnab } from 'src/repositories/entities/cnab.entity';
import { ICnab, IReadOperation } from 'src/repositories/types';

export class CnabService extends AbstractDbService {
	constructor(conn: Knex) {
		super(conn, 'transactions');
	}

	async validateData(data: Cnab) {
		try {
			existsOrError(data.type, 'Type is required');
			existsOrError(data.date, 'Date is required');
			existsOrError(data.value, 'value is required');
			existsOrError(data.cpf, 'CPF is required');
			existsOrError(data.card, 'Card is required');
			existsOrError(data.owner, 'Owner is required');
			existsOrError(data.store, 'Store is required');
		} catch (message) {
			return message;
		}
	}

	save(data: Cnab) {
		return data.id ? this.update(data.id, data) : this.create(data);
	}

	readByStore(store: string, options?: IReadOperation) {
		const fields = options?.fields || [];

		return this.connection(this.table)
			.select(...fields)
			.where({store})
			.then(result => ({data: result, total: result.length, balance: this.calculateBalance(result)}))
			.catch(error => error);
	}

	calculateBalance(trasactions: ICnab[]) {
		const entry = trasactions.filter(transaction => ENTRY_TYPES.includes(transaction.type))
			.reduce((acc, item) => acc + item.value, 0);
		const out = trasactions.filter(transaction => OUT_TYPES.includes(transaction.type))
			.reduce((acc, item) => acc + item.value, 0);
		return entry - out;
	}

}
