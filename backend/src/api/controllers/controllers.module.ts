import { ServicesModule } from 'src/services/services.module';
import { AuthController } from 'src/api/controllers/auth.controller';
import { UserController } from 'src/api/controllers/user.controller';
import { CnabController } from 'src/api/controllers/cnab.controller';


export class ControllersModule {
	authController: AuthController;
	uerController: UserController;
	cnabController: CnabController;

	constructor(private services: ServicesModule) {
		this.authController = new AuthController(this.services.authService, this.services.userService);
		this.uerController = new UserController(this.services.userService);
		this.cnabController = new CnabController(this.services.fileService, this.services.cnabService);
	}
}
