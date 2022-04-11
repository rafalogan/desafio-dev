import { Request, Response } from 'express';

import { FileService } from 'src/services/file.service';
import { CnabService } from 'src/services/cnab.service';
import { ICnabData } from 'src/repositories/types';
import { Cnab } from 'src/repositories/entities/cnab.entity';
import { clearRepeatItens, existsOrError, onInfo, onLog, onResponseError, onResponseSuccess } from 'src/utils';


export class CnabController {
	constructor(private fileService: FileService, private cnabService: CnabService) {}

	async getStories(req: Request, res: Response) {
		this.cnabService.readStoriesNames()
			.then(data => onResponseSuccess(res, clearRepeatItens(data)))
			.catch(error => onResponseError({res, message: 'Erro ao buscar nomes', error}));
	}

	async processFile(req: Request, res: Response) {
		const file: any = req.file;
		try {
			existsOrError(file, 'Arquivo não encontrado');
		} catch (error) {
			return onResponseError({res, error, message: 'Erro ao enviar arquivo'});
		}

		const process: ICnabData[] = await this.fileService.readFile(file.path);
		const data: Cnab[] = process.map(item => new Cnab(item));

		try {
			const porcesedData =  data.map((item) => this.cnabService.save(item)
				.then( result => result)
				.catch(err => err));

			onResponseSuccess(res, data);
		} catch (error) {
			onResponseError({res, error, message: 'Erro ao processar arquivo'});
		}
	}

	readAll(req: Request, res: Response) {
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 10;

		this.cnabService.read({paginationOptions: {page, limit}})
			.then(result => onResponseSuccess(res, result))
			.catch(error => onResponseError({res, error, message: 'Erro exibi todos os CNAB'}));
	}

	readByStore(req: Request, res: Response) {
		const store = req.params.store.toUpperCase();

		this.cnabService.readByStore(store)
			.then(result => onResponseSuccess(res, result))
			.catch(error => onResponseError({res, message: 'Erro ao exibir CNAB por loja', error}));
	}


}
