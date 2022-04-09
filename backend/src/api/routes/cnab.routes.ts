import { CnabController } from 'src/api/controllers/cnab.controller';
import { Application } from 'express';
import { AbstractRoutes } from 'src/core';

export class CnabRoutes extends AbstractRoutes {
	constructor(private cnabContorller: CnabController, app: Application) {
		super(app);
	}

	initRoutes() {
		this.app.route('/process/:file').get(this.cnabContorller.processFile.bind(this.cnabContorller));

		this.app.route('/transactions').get(this.cnabContorller.readAll.bind(this.cnabContorller));
		this.app.route('/transactions/:store').get(this.cnabContorller.readByStore.bind(this.cnabContorller));
	}
}
