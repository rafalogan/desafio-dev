import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { User } from 'src/repositories/entities/user.entity';
import { UserService } from 'src/services/user.service';
import { onResponseError, onResponseSuccess } from 'src/utils';


export class UserController {
	constructor(private userService: UserService) {
	}

	async save(req: Request, res: Response) {

		try {
			await this.userService.userValidate(req.body);
		} catch (error) {
			return onResponseError({res, error, status: httpStatus.BAD_REQUEST, message: 'Validation error'});
		}

		const user = new User(req.body);

		this.userService
			.create(user)
			.then(result => onResponseSuccess(res, result))
			.catch(err => onResponseError({res, message: 'unexpected error', error: err }));
	}

	async edit(req: Request, res: Response) {
		const id = Number(req.params.id);
		const user = new User(req.body, Number(req.params.id));

		this.userService
			.update( id, user )
			.then(data => onResponseSuccess(res, data))
			.catch(error => onResponseError({res, message: 'unexpected error', error} ));
	}

	list(req: Request, res: Response) {
		const id = Number(req.params.id);
		const page = Number(req.query.page);
		const limit = Number(req.query.limit);

		this.userService
			.read({ id,
		paginationOptions: {
			page, limit
		}})
			.then(data => onResponseSuccess(res, data))
			.catch(err => onResponseError({res, message: 'unexpected error', error:  err }));
	}

	async remove(req: Request, res: Response) {
		const id = Number(req.params.id);

		try {
			const deleted = await this.userService.delete(id);

			return deleted.status
				? onResponseError({res, message: deleted.message, error: {status: deleted.status}})
				: onResponseSuccess(res, deleted);
		} catch (error) {
			return onResponseError({res, message: 'unexpected error',  error });
		}
	}
}
