import { readFileSync } from 'fs'
import { ICnabData } from 'src/repositories/types/cnabfile';
import { convertSrtringToTimeString, convertStringToDateString, onLog } from 'src/utils';



export class FileService {

	constructor() {}

	async readFile(path: string) {
		const read = readFileSync(path, 'utf8').toString()
		const lines = this.translateStrigToArray(read);

		return this.processArray(lines);
	}

	private translateStrigToArray = (str?: string) => {
		return str?.split('\n')
			.filter(item => item.length > 0)
	}

	private async processArray(array?: string[]): Promise<ICnabData[]> {
		const result: ICnabData[] = []

		array?.forEach(item => {
			result.push({
				type: Number(item.slice(0,1)),
				date: convertStringToDateString(item.slice(1, 9)),
				value: Number(item.slice(9,19)),
				cpf: item.slice(19, 30),
				card: item.slice(30, 42),
				time: convertSrtringToTimeString(item.slice(42, 48)),
				owner: item.slice(48, 62).trim(),
				store: item.slice(62, item.length).trim(),
			})
		})
		return result
	}

}

