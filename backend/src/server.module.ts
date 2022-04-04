import { ServerController } from 'src/server.controller';
import { ConnectionController } from 'src/core/controllers/connection.controller';
import { onError } from 'src/utils';

export class ServerModule {
	constructor(private serverController: ServerController,
							private connectionController: ConnectionController) {
	}

	start() {
		return this.connectionController.isConnected()
			.then(() => this.connectionController.latest())
			.then(() => this.serverController.exec())
			.catch(err => onError('erro on start server', err));
	}
}
