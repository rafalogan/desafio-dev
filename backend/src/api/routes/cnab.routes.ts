import { CnabController } from 'src/api/controllers/cnab.controller';
import { Application } from 'express';
import { AbstractRoutes } from 'src/core';
import { upload } from 'src/core/middlewares';

export class CnabRoutes extends AbstractRoutes {
	constructor(private cnabContorller: CnabController, app: Application) {
		super(app);
	}

	initRoutes() {
		this.app.route('/upload')
			.post(upload.single('file'), this.cnabContorller.processFile.bind(this.cnabContorller));

		this.app.route('/transactions').get(this.cnabContorller.readAll.bind(this.cnabContorller));
		this.app.route('/transactions/:store').get(this.cnabContorller.readByStore.bind(this.cnabContorller));
		this.app.route('/stories').get(this.cnabContorller.getStories.bind(this.cnabContorller));
	}
}
