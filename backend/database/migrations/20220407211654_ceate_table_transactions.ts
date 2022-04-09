import { Knex } from "knex";
import TableBuilder = Knex.TableBuilder;


export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('transactions', (table: TableBuilder) => {
		table.increments('id').primary();
		table.integer('type').notNullable();
		table.timestamp('date').notNullable();
		table.integer('value').notNullable();
		table.string('cpf').notNullable();
		table.string('card').notNullable();
		table.string('owner').notNullable();
		table.string('store').notNullable();
	});
}


export async function down(knex: Knex): Promise<void> {
}

