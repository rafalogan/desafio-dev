import { Application } from 'express';

export abstract class AbstractRoutes {
	protected app: Application;

	constructor(app: Application) {
		this.app = app;
	}

	abstract initRoutes(): void;
}
