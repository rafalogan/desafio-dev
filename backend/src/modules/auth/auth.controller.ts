import httpStatus, { HttpStatus } from 'http-status';
import { Request, Response } from 'express';

import { AuthService } from 'src/services/auth.service';
import { ICredentials, IErroValidationUser } from 'src/core/types';
import { onInfo, onResponseError, onResponseSuccess } from 'src/utils';
import { UserService } from 'src/services/user.service';
import { User } from 'src/core/repositories/user.entity';



export class AuthController {


	constructor(private authService: AuthService, private userService: UserService) {
	}

	async signin(req: Request, res: Response) {
		const auth: ICredentials = {
			email: req.body.email,
			password: req.body.password
		};

		this.authService
			.verifyCredentials(auth)
			.then(data => onResponseSuccess(res, data))
			.catch(err => onResponseError({
				res,
				message:'Login Unauthorized! Verify your e-mail and password!',
				status: httpStatus.UNAUTHORIZED,
				error: err
			}));
	}

	async signup(req: Request, res: Response) {
		try {
			await this.userService.userValidate(req.body);
		} catch (response: any ) {
			return onResponseError({
				res,
				message: response.msg,
				status: response.code,
			});
		}


		const user = new User(req.body);

		this.authService
			.signupOpApp(user)
			.then(result => {

				Reflect.deleteProperty(user, 'password');
				Reflect.deleteProperty(user, 'confirmPassword');

				onInfo('result save', result);
				return onResponseSuccess(res, user);
			})
			.catch(err => onResponseError({res, message: 'Unexpected error', error: err}));
	}

	validateToken(req: Request, res: Response) {
		const result = this.authService.tokemIsValid(req);
		const { code, message } = result;

		code === 200 ? onResponseSuccess(res, result) : onResponseError({res, message, status: code});
	}
}
