import { Cnab } from '../../../src/repositories/entities/cnab.entity';
import { expectedFileRead } from '../../../database/test/files';
import { onLog } from '../../../src/utils';
import { ICnabData } from '../../../src/repositories/types';

describe('CnabEntity', () => {
	it('should be defined no id', () => {
		const result = new Cnab(expectedFileRead[0] as ICnabData);

		expect(result).toBeInstanceOf(Cnab);
		expect(result).toBeDefined();
		expect(result.id).toBeUndefined();
		expect(result.date).toEqual(new Date(`${expectedFileRead[0].date}T${expectedFileRead[0].time}`));
		expect(result.value).toEqual(expectedFileRead[0].value);
	});

	it('should be defined with Id', () => {
		const result = new Cnab(expectedFileRead[1] as ICnabData, Number(expectedFileRead.length - 1));

		expect(result).toBeInstanceOf(Cnab);
		expect(result).toBeDefined();
		expect(result.id).toBeDefined();
		expect(result.date).toEqual(new Date(`${expectedFileRead[1].date}T${expectedFileRead[1].time}`));
		expect(result.value).toEqual(expectedFileRead[1].value);
	});
});
