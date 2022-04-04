import { CalcService } from 'src/services/calc.service';

const instaceCalcService = new CalcService();

export default class ServicesModule {
	calcService = instaceCalcService;

	constuctor() {}
}
