import { Application } from 'express';

import { AbstractRoutes } from 'src/core';
import { AuthController } from 'src/api/controllers/auth.controller';



export class AuthRoutes extends AbstractRoutes{
	constructor(private authController: AuthController, app: Application){
		super(app);
	}

	initRoutes() {
		this.app.route('/signin').post(this.authController.signin.bind(this.authController));
		this.app.route('/signup').post(this.authController.signup.bind(this.authController));
		this.app.route('validate-token').post(this.authController.validateToken.bind(this.authController));
	}
}
