import { HttpStatus } from 'http-status';

export interface IUser {
	id?: number;
	name: string;
	email: string;
	password: string;
	confirmPassword?: string;
	admin: boolean;
	deletedAt?: Date;
}


export interface IErroValidationUser {
	code: HttpStatus,
	msg: string
}
