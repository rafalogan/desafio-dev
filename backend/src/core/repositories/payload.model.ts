import { IPayload } from 'src/core/types';
import { User } from 'src/core/repositories/user.entity';

export class Payload implements IPayload {
	id: number;
	name: string;
	email: string;
	admin: boolean;
	iat: number;
	exp: number;

	constructor(data: User | IPayload ) {
		this.id = data.id;
		this.name = data.name;
		this.email = data.email;
		this.admin = data.admin;
		this.iat = !(data instanceof User) && data.iat ? data.iat : this.now();
		this.exp = !(data instanceof User) && data.exp ? data.exp : this.expires();
	}

	private now() {
		return Math.floor(Date.now() / 1000);
	}

	private expires() {
		return this.iat + 60 * 60 * 24;
	}

}
