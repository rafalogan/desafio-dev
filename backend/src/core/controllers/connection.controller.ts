import { knex, Knex } from 'knex';
import MigratorConfig = Knex.MigratorConfig;
import { onError, onInfo, onLog } from 'src/utils';

export class ConnectionController {
	connection: Knex;

	constructor(private file: Knex.Config) {
		this.connection = knex(this.file as Knex.Config);
	}

	isConnected(): Promise<void> {
		return this.connection.raw('SELECT 1+1 AS result')
			.then(result => onInfo(`SUCCESS: database is connected active: ${!!result}`))
			.catch((err: Error) => onError('FAIL: Database is not Connected', err));
	}

	latest() {
		return this.connection.migrate.latest(this.file as MigratorConfig)
			.then(() => onLog('Database is updated!'))
			.catch(err => onLog('Erro on updated database: ', err));
	}

	rollback() {
		return this.connection.migrate.rollback(this.file as MigratorConfig)
			.then(() => onLog('Database is rollback!'))
			.catch(err => onLog('Erro on rollback database: ', err));
	}
}
