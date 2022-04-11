import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export const notFound = (req: Request, res: Response, next: NextFunction) => res.status(404).send({
		status: 404,
		message: 'Not Found',
	});


export const upload = multer({
	dest: './uploads/',
});
