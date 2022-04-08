import {
	IDatabaseEnvironment,
	IknexConnection,
	IKnexFile,
	IKnexMigrationConfig,
	IKnexPoolConfig
} from 'src/repositories/types';


export class KnexFileConfig  implements  IKnexFile {
	client: string;
	connection: string | IknexConnection;
	migrations: IKnexMigrationConfig;
	pool: IKnexPoolConfig;

	constructor(private databaseConfig: IDatabaseEnvironment, migationConfig?: IKnexMigrationConfig, poolConfig?: IKnexPoolConfig) {
		this.client = this.databaseConfig.client;
		this.connection = this.setConexionConfigs();
		this.pool = this.setPoolConfigs(poolConfig);
		this.migrations = this.setMigrationConfig(migationConfig);
	}

	setPoolConfigs(poolConfig?: IKnexPoolConfig) {
		return {
			...poolConfig,
			min: poolConfig?.min || 1,
			max: poolConfig?.max || 10
		}
	}

	setMigrationConfig(migrationConfig?: IKnexMigrationConfig): IKnexMigrationConfig {
		return {
			...migrationConfig,
			tableName: migrationConfig?.tableName || "knex_migrations",
			directory: migrationConfig?.directory || 'database/migrations',
			extension: migrationConfig?.extension ||  'ts'
		};
	}

	private setConexionConfigs(): string | IknexConnection {
		return (this.databaseConfig.urlConnection)
			? this.databaseConfig.urlConnection
			: {
				host: this.databaseConfig.host,
				port: this.databaseConfig.port,
				user: this.databaseConfig.user,
				password: this.databaseConfig.password,
				database: this.databaseConfig.database,
				filename: this.databaseConfig.filename
			};
	}


}
