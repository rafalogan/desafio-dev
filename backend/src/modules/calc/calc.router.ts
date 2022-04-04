import { Application } from 'express';

import { AbstractRoutes } from 'src/core';
import { CalcController } from 'src/modules/calc/calc.controller';

export class CalcRouter extends AbstractRoutes {
	constructor(app: Application, private calcController: CalcController) {
		super(app);
	}

	initRoutes(): void {
		this.app.route('/calc/:number').get(this.calcController.calcNumber.bind(this.calcController));
	}
}
