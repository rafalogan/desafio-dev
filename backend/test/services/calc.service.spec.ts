import { CalcService } from '../../src/services/calc.service';
import { ICalc } from '../../src/core/';

const calcService = new CalcService();

describe('CalcService', () => {
	it('Should add a nunber', () => {
		const getCalcNumber = calcService.getResultCalc(45);
		const expected: ICalc = {
			input: 45,
			dividers: [1, 3, 5, 9, 15, 45],
			primeDivisors: [3, 5],
		};

		expect(getCalcNumber).toEqual(expected);
	});

	it('Should input number return dividers array ', () => {
		const calcDividers = calcService.calcDividers(45);
		const expected: number[] = [1, 3, 5, 9, 15, 45];

		expect(calcDividers).toEqual(expected);
	});

	it('Should input dividers array return, which the divisors are prime', () => {
		const calcPrimeDivisors = calcService.calcPrimeDivisors([1, 3, 5, 9, 15, 45]);
		const expected: number[] = [3, 5];

		expect(calcPrimeDivisors).toEqual(expected);
	});
});
