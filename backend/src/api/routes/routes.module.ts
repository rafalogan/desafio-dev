import { Application } from 'express';
import { ControllersModule } from 'src/api/controllers/controllers.module';

import { AuthService } from 'src/services/auth.service';
import { notFound } from 'src/core/middlewares';
import { AuthRoutes } from 'src/api/routes/auth.routes';
import { UserRoutes } from 'src/api/routes/user.routes';
import { CnabRoutes } from 'src/api/routes/cnab.routes';

export class RoutesModule {
	authRoutes: AuthRoutes;
	userRoutes: UserRoutes;
	cnabRoutes: CnabRoutes;

	constructor(private app: Application, private cotrollers: ControllersModule, private auth: AuthService) {
		this.authRoutes = new AuthRoutes( this.cotrollers.authController, this.app );
		this.userRoutes = new UserRoutes( this.cotrollers.uerController, this.app, this.auth);
		this.cnabRoutes = new CnabRoutes( this.cotrollers.cnabController, this.app);
	}

	exec() {
		this.authRoutes.initRoutes();
		this.userRoutes.initRoutes();
		this.cnabRoutes.initRoutes();
		this.app.use(notFound);
	}
}
