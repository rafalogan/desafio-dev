import { FileService } from '../../src/services/file.service';
import { expectedFileRead } from '../../database/test/files';

describe('FileService', () => {
	let service: FileService;

	beforeEach(() => service = new FileService());

	it('Should be return a string when read flie', async () => {
		const result = await service.readFile('./database/test/files/cnab-test.txt');

		expect(result).toEqual(expectedFileRead);
	});
});
