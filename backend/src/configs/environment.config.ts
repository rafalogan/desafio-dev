import { IDatabaseEnvironment, IEnvironment, ISecurityEnvironment } from 'src/repositories/types';

export class Environment implements IEnvironment {
	nodeEnv: string;
	port: number;
	host: string;
	databaseConfig: IDatabaseEnvironment;
	security: ISecurityEnvironment;
	timezone: string;
	baseUrl?: string | undefined;
	salt: number;

	constructor() {
		this.nodeEnv = process.env.NODE_ENV || 'development';
		this.port = Number(process.env.PORT) || 3000;
		this.host = process.env.host || 'localhost';
		this.databaseConfig = this.setDatabase();
		this.security = this.setSecurity();
		this.timezone = process.env.TIMEZONE || 'America/Sao_Paulo';

		this.salt = Number(process.env.SALT) || 10;
		this.baseUrl = this.setBaseUrl();
	}

	private setDatabase(): IDatabaseEnvironment {
		return {
			client: process.env.DB_CLIENT || '',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			filename: process.env.DB_FILENAME,
		};
	}

	private setSecurity(): ISecurityEnvironment {
		return {
			enableHTTPS: process.env.ENABLE_HTTPS === 'true',
			certFile: process.env.CERT_FILE || '',
			keyFile: process.env.KEY_FILE || '',
			authSecret: process.env.AUTHSECRET || '',
		};
	}

	private setBaseUrl(): string {
		const { enableHTTPS } = this.security;

		return `${(enableHTTPS) ? 'https' : 'http'}://${this.host}:${this.port}`;
	}
}

