import http from 'http';
import https, { ServerOptions } from 'https';
import { Application } from 'express';

import { onError, onInfo } from 'src/utils';
import { Environment } from 'src/configs/environment.config';

export class ServerController {
	server?: http.Server | https.Server;

	constructor(
		private enviroment: Environment,
		private app: Application,
		private httpsOptions: ServerOptions
	) {
	}

	exec() {
		return this.enviroment.security.enableHTTPS ? this.creatServerHttps() : this.creatServerHttp();
	}

	private creatServerHttp(): http.Server {
		return http
			.createServer(this.app)
			.listen(this.enviroment.port)
			.on('listening', () => this.onServerUp())
			.on('error', err => this.onServerError(err));
	}

	private creatServerHttps(): https.Server {
		return https
			.createServer(this.httpsOptions, this.app)
			.listen(this.enviroment.port)
			.on('listening', () => this.onServerUp())
			.on('error', err => this.onServerError(err));
	}

	private onServerUp() {
		return onInfo(`Server is up on:`, this.enviroment.baseUrl);
	}

	private onServerError(err: NodeJS.ErrnoException) {
		return onError('Server coneection error', err);
	}
}
