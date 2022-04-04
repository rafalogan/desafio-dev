require('ts-node/register');
require('tsconfig-paths/register');

import type { Knex } from "knex";
import { environment } from './src/server';
import { KnexFileConfig } from './src/configs/knex-file.config';

const { databaseConfig }= environment;

const config:  Knex.Config  = new KnexFileConfig(databaseConfig)

module.exports = config;
