import { Application } from 'express';

import { CalcRouter } from 'src/modules/calc/calc.router';
import { CalcController } from 'src/modules/calc/calc.controller';
import { CalcService } from 'src/services/calc.service';

export default class CalcModule {
	private calcoController: CalcController;
	private calcRouter: CalcRouter;

	constructor(app: Application, calcService: CalcService) {
		this.calcoController = new CalcController(calcService);
		this.calcRouter = new CalcRouter(app, this.calcoController);
	}

	exec() {
		return this.calcRouter.initRoutes();
	}
}
