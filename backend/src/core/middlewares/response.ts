import { Request, Response, NextFunction } from 'express';

export const notFound = (req: Request, res: Response, next: NextFunction) => res.status(404).send({
		status: 404,
		message: 'Not Found',
	});
