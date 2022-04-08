import { IUser } from 'src/repositories/types';

export class User implements IUser {
	id?: number;
	admin: boolean;
	name: string;
	email: string;
	password: string;
	confirmPassword?: string;
	deletedAt?: Date;

	constructor(props: IUser, id?: number) {
		this.id = ('id' in props) ? props.id : id;
		this.name = props.name;
		this.admin = props.admin || false;
		this.email = props.email;
		this.password = props.password;
		this.confirmPassword = props.confirmPassword;
		this.deletedAt = (props.deletedAt) ? new Date(props.deletedAt) : undefined;
	}

}
