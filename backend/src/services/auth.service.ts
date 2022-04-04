import passport from 'passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import httpStatus from 'http-status';
import jwt from 'jwt-simple'
import { Request } from 'express';

import { User } from 'src/core/repositories/user.entity';
import { UserService } from 'src/services/user.service';
import { existsOrError, isMatch, onError } from 'src/utils';
import { ICredentials, IUser } from 'src/core/types';
import { Payload } from 'src/core/repositories/payload.model';


export class AuthService {
	private readonly params: StrategyOptions;
	private readonly authSecret: string;

	constructor(private userService: UserService, authSecret: string) {
		this.authSecret = authSecret;
		this.params = this.setStategyOtions();
	}

	init() {
		const strategy = new Strategy(this.params, (payload, done) => {
			const id = Number(payload?.id);

			this.userService
				.read({ id })
				.then(data => done(null, data instanceof User ? this.prepareUserToToken(data) : false))
				.catch(err => done(err, false));
		});
		const session = false;

		passport.use(strategy);
		return {
			authenticate: () => passport.authenticate('jwt', { session }),
		};
	}

	async verifyCredentials(credentials: ICredentials) {
		try {
			const findDB = await this.userService.findByEmail(credentials.email);
			const user = new User(findDB as IUser);
			existsOrError(user, 'User not found');

			if (isMatch(credentials, user) && user) {
				const payload = new Payload(user);
				return { ...payload, token: jwt.encode(payload, this.authSecret) };
			}
		} catch (err) {
			onError('erro on verify credentials', err);
			return err;
		}
	}

	async signupOpApp(user: User) {
		return this.userService.create(user);
	}

	getPayload(req: Request) {
		const token = this.extractToken(req);
		return token ? this.decodeToken(token) : undefined;
	}

	tokemIsValid(req: Request) {
		try {
			const token = this.extractToken(req);
			const payload = token ? this.decodeToken(token) : undefined;
			const valid = payload?.exp ? new Date(payload.exp * 1000) > new Date() : false;
			const code = valid ? 200 : httpStatus.UNAUTHORIZED;

			existsOrError(token, 'Token is not valid or not found.');
			existsOrError(payload, 'Payload is not found.');

			return valid ? { valid, code, message: 'Token is valid' } : { valid, code, message: 'token is not valid' };
		} catch (message) {
			onError(message);
			return { valid: false, code: httpStatus.UNAUTHORIZED, message: `${message}` };
		}
	}

	private prepareUserToToken(user: User) {
		Reflect.deleteProperty(user, 'password');
		return user;
	}

	private setStategyOtions(): StrategyOptions {
		const secretOrKey = this.authSecret;
		const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

		return { secretOrKey, jwtFromRequest };
	}

	private extractToken(req: Request) {
		const { authorization } = req.headers;
		const [agent, token] = authorization ? authorization.split(' ') : [];

		return agent === 'Bearer' ? token : undefined;
	}

	private decodeToken(token: string): Payload {
		const dataRaw = jwt.decode(token, this.authSecret);

		return new Payload(dataRaw);
	}
}
