import express, { Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import { AppConfigOptions } from 'src/repositories/types';
import { ControllersModule } from 'src/api/controllers/controllers.module';
import { RoutesModule } from 'src/api/routes/routes.module';
import { ServicesModule } from 'src/services/services.module';


export class AppConfig {
	private readonly _express: Application;
	private readonly servicesModule: ServicesModule;
	private readonly environment: string;

	constructor(options: AppConfigOptions) {
		this._express = express();
		this.servicesModule = options.servicesModule;
		this.environment = options.environment;

		this.exec();
	}

	get express(): Application {
		return this._express;
	}

	exec() {
		this.configExpress();
		this.initModules();
	}

	private configExpress() {
		this.express.use(cors({
			origin: '*',
			methods: ['GET', 'POST', 'PUT', 'DELETE'],
			allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
			exposedHeaders: ['Content-Type', 'Authorization', 'Accept'],
			credentials: true,
			optionsSuccessStatus: 200
		}));
		this.express.use(morgan(this.environment !== 'production' ? 'dev' : 'combined'));
		this.express.use(bodyParser.urlencoded({ extended: false }));
		this.express.use(bodyParser.json());
	}

	private initModules() {
		const controllers = new ControllersModule(this.servicesModule);
		const routes = new RoutesModule(this.express, controllers, this.servicesModule.authService);

		return routes.exec();
	}
}
