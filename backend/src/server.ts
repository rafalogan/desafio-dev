

import * as fs from 'fs';


import { execDotEnv, onError, onLog } from 'src/utils';

import { ServerController } from 'src/server.controller';
import { AppConfig } from 'src/configs/app.config';
import { ServicesModule } from 'src/services/services.module';
import { Environment } from 'src/configs/environment.config';
import { ConnectionController } from 'src/core/controllers/connection.controller';
import { KnexFileConfig } from 'src/configs/knex-file.config';
import { ServerModule } from 'src/server.module';

execDotEnv();

export const environment = new Environment();
onLog('environment', environment);
const { security, databaseConfig } = environment;


const cert = security.certFile ? fs.readFileSync(security.certFile) : '';
const key = security.keyFile ? fs.readFileSync(security.keyFile) : '';

const knexfile = new KnexFileConfig(databaseConfig);
const connection = new ConnectionController(knexfile);
const servicesModule = new ServicesModule(environment, connection.connection);

const app = new AppConfig({ servicesModule, environment: environment.nodeEnv }).express;
const serverController = new ServerController(environment, app, { cert, key });

export const server = new ServerModule(serverController, connection);



