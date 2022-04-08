import { CalcService } from 'src/services/calc.service';
import { FileService } from 'src/services/file.service';
import { onLog } from 'src/utils';

const instaceCalcService = new CalcService();
const fileService = new FileService();

fileService.readFile('../CNAB.txt')
	.then(onLog)

export default class ServicesModule {
	calcService = instaceCalcService;

	constuctor() {
	}
}
