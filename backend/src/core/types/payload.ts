import { IUser } from 'src/core/types/user';

export interface ICredentials {
	email: string;
	password: string;
}


export interface IPayload  {
	id: number;
	name: string;
	email: string;
	admin: boolean;
	iat: number;
	exp: number;
}
