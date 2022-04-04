export interface IEnvironment {
	nodeEnv: string;
	port: number;
	host: string;
	databaseConfig: IDatabaseEnvironment;
	security: ISecurityEnvironment;
	timezone: string;
	baseUrl?: string;
	salt?: number;
}


export interface IDatabaseEnvironment {
	client: string;
	host?: string;
	database?: string;
	user?: string;
	password?: string;
	port?: number;
	filename?: string;
	urlConnection?: string;
}

export interface ISecurityEnvironment {
	enableHTTPS: boolean;
	certFile: string;
	keyFile: string;
	authSecret: string;
}
