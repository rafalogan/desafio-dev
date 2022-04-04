import express, { Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import ServicesModule from 'src/services/services.module';
import CalcModule from 'src/modules/calc/calc.module';
import { AppConfigOptions } from 'src/core/types';


export class AppConfig {
	private _express: Application;
	private servicesModule: ServicesModule;
	private environment: string;

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
		this.express.use(cors());
		this.express.use(morgan(this.environment !== 'production' ? 'dev' : 'combined'));
		this.express.use(bodyParser.urlencoded({ extended: false }));
		this.express.use(bodyParser.json());
	}

	private initModules() {
		const { calcService } = this.servicesModule;
		new CalcModule(this.express, calcService).exec();
	}
}
