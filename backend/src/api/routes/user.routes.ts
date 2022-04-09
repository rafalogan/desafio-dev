import { Application } from 'express';

import { AuthService } from 'src/services/auth.service';
import { UserController } from 'src/api/controllers/user.controller';
import { AbstractRoutes } from 'src/core';


export class UserRoutes extends AbstractRoutes {
	constructor(private userController: UserController, app: Application, auth: AuthService) {
		super(app, auth);
	}

	initRoutes() {
		this.app
			.route('/users')
			.all(this.auth?.init().authenticate())
			.get(this.userController.list.bind(this.userController))
			.post(this.userController.save.bind(this.userController));

		this.app
			.route('/users/:id')
			.all(this.auth?.init().authenticate())
			.get(this.userController.list.bind(this.userController))
			.put(this.userController.edit.bind(this.userController))
			.delete(this.userController.remove.bind(this.userController));
	}
}
