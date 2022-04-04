import { ICalc } from 'src/core';

export class CalcService {
	constructor() {}

	getResultCalc(id: number): ICalc {
		const dividers = this.calcDividers(id);
		const primeDivisors = this.calcPrimeDivisors(dividers);

		return {
			input: id,
			dividers,
			primeDivisors,
		};
	}

	calcDividers(input: number): number[] {
		const dividers: number[] = [];
		for (let i = 1; i <= input; i++) {
			if (input % i === 0) {
				dividers.push(i);
			}
		}
		return dividers;
	}

	calcPrimeDivisors(input: number[]): number[] {
		return input.filter(item => this.isPrime(item));
	}

	private isPrime(input: number): boolean {
		if (input < 2) return false;

		for (let i = 2; i < input; i++) {
			if (input % i === 0) return false;
		}

		return true;
	}
}
