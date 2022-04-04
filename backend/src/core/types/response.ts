import { Response } from 'express';

export interface ErroRsponseOpitons {
	res: Response;
	status?: number;
	message: string;
	error?: any;
}
