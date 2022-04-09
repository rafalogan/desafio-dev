import { Knex } from 'knex';

import { Environment } from 'src/configs/environment.config';
import { FileService } from 'src/services/file.service';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { CnabService } from 'src/services/cnab.service';


export class ServicesModule {
	fileService: FileService;
	userService: UserService;
	authService: AuthService;
	cnabService: CnabService;

	constructor(private env: Environment, private connection: Knex) {
		this.fileService = new FileService();
		this.userService = new UserService(this.env.salt, this.connection);
		this.authService = new AuthService(this.userService, this.env.security.authSecret);
		this.cnabService = new CnabService(this.connection);
	}
}
