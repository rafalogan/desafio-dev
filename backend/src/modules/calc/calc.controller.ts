import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { CalcService } from 'src/services/calc.service';
import { onResponseError, onResponseSuccess } from 'src/utils';

export class CalcController {
	constructor(private calcService: CalcService) {}

	calcNumber(req: Request, res: Response) {
		const number = Number(req.params.number);
		try {
			if (isNaN(number)) {
				throw new Error('Invalid number');
			}
			const result = this.calcService.getResultCalc(number);

			return onResponseSuccess(res, result);
		} catch (error) {
			return onResponseError({ res, status: httpStatus.BAD_REQUEST, message: `Erro ao Calcular numero, ${number}`, error });
		}
	}
}
