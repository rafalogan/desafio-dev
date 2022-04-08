import {  Knex } from 'knex';
import { IReadOperation } from 'src/repositories/types';
import { existsOrError, ResponseException } from 'src/utils';
import httpStatus from 'http-status';

export abstract class AbstractDbService {
	protected connection: Knex;
	protected table: string;

	constructor(connection: Knex, table: string) {
		this.connection = connection;
		this.table = table;
	}


	create(data: any): Promise<any> {
		return this.connection(this.table).insert(data)
			.then((result) =>result)
			.catch((err) => err);
	}

	read(options: IReadOperation): Promise<any> {
		return (options.id) ? this.findOneById(options) : this.findAll(options);
	}


	update(id: number, data: any): Promise<any> {
		return this.connection(this.table).update(data)
			.where({ id })
			.then((result) => result)
			.catch((err) => err);
	}


	async delete(id: number): Promise<any> {
		const element = await this.findOneById({ id });
		try {
			existsOrError(element, `The register nº ${id} not find in table: ${this.table}`);

		} catch (message) {
			const err = new ResponseException(message as string);

			return { status: httpStatus.BAD_REQUEST, message, err };
		}

		return this.connection(this.table)
			.where({ id })
			.del()
			.then((result) => ({
				result,
				deleted: result > 0,
				element
			}))
			.catch((err) => err);
	}

	async constById() {
		const result = await this.connection(this.table).count({ count: 'id' }).first();
		return Number(result?.count);
	}


	private async findAll(options: IReadOperation): Promise<any> {
		const filds = options.fields || [];
		const limit = options.paginationOptions?.limit || 10;
		const page = options.paginationOptions?.page || 1;
		const count = await this.constById()
		const orderBy = options.orderBy || 'id';
		const offset = (page - limit) * limit;

		return this.connection(this.table).select({...filds})
			.orderBy( orderBy)
			.limit(limit)
			.offset(offset)
			.then((result) => ({data: result, pagination: {count, limit, page}}))
			.catch((err) => err);
	}

	private async findOneById(options: IReadOperation): Promise<any> {
		const filds = options.fields || [];
		const id = options.id;
		return this.connection(this.table).select({...filds})
			.where({id})
			.first()
			.then((result) => result)
			.catch((err) => err);
	}
}
