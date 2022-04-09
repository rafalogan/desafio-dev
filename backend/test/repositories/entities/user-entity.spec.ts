import { faker } from '@faker-js/faker';

import { IUser } from '../../../src/repositories/types';
import { User } from '../../../src/repositories/entities/user.entity';
import { onLog } from '../../../src/utils';

describe('UserEntity', () => {
	let userData: IUser;

	beforeEach(() => {
		userData = {
			id: 1,
			name: faker.name.findName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			admin: true,
		};
		userData.confirmPassword = userData.password;
	})

	it('should be defined without id value', () => {
		Reflect.deleteProperty(userData, 'id');
		const result = new User(userData);

		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(User);
		expect(result.id).toBeUndefined();
		expect(result.password).toBe(userData.confirmPassword);
	});

	it('should be defined with id value', () => {
		const result = new User(userData);

		expect(result).toBeDefined();
		expect(result).toBeInstanceOf(User);
		expect(result.id).toBeDefined();
		expect(result.id).toEqual(userData.id);
	});
});
