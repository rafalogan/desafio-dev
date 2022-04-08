import { Knex } from 'knex';
import httpStatus from 'http-status';

import { AbstractDbService } from 'src/core';
import { User } from 'src/repositories/entities/user.entity';
import { equalsOrError, existsOrError, hashString, notExistisOrError, onError } from 'src/utils';
import { IReadOperation, IUser } from 'src/repositories/types';

export class UserService extends AbstractDbService {
	constructor(private salt: number, conn: Knex) {
		super(conn, 'users');
	}


	async userValidate(data: IUser) {
		const userFromDb = await this.findByEmail(data.email);

		try {
			existsOrError(data.name, 'Field Name is required.');
			existsOrError(data.email, 'Field E-mail is required.');
			existsOrError(data.password, 'Field Password is required.');
			existsOrError(data.confirmPassword, 'Field Confirm Password');
			equalsOrError(data.password, data.confirmPassword, 'passwords do not match.');
			notExistisOrError(userFromDb, `User ${data.email}, already registered`);
			return;
		} catch (msg) {
			return { code: httpStatus.BAD_REQUEST, msg };
		}
	}

	create(data: User) {
		data.password = hashString(data.password, this.salt);
		Reflect.deleteProperty(data, 'confirmPassword');

		return super.create(data);
	}

	read(options: IReadOperation) {
		return super.read(options)
			.then((result: IUser | IUser[]) => {
				if (Array.isArray(result)) {
					return result.map((user: IUser) => {
						Reflect.deleteProperty(user, 'password');
						return user;
					});
				}

				Reflect.deleteProperty(result, 'password');
				return result;
			})
			.catch(err => onError('Erro na busca', err));
	}

	findByEmail(email: string) {
		return this.connection(this.table).select()
			.where({ email })
			.first()
			.then((user: IUser) => {
				Reflect.deleteProperty(user, 'password');
				return user;
			})
			.catch(err => onError('Erro au buscar usuário', err));

	}


}
