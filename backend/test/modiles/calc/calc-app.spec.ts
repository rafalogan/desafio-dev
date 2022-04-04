import http from 'http';
import { Application } from 'express';
import request from 'supertest';

import { AppConfigOptions, ICalc } from '../../../src/core';
import ServicesModule from '../../../src/services/services.module';
import { AppConfig } from '../../../src/configs/app.config';
import { execDotEnv } from '../../../src/utils';
import fs from 'fs';
import { ServerController } from '../../../src/server.controller';

describe('Test Application calc divisors', () => {
	let app: http.Server;
	beforeAll(async () => {
		execDotEnv();
		const { PORT, HOST, ENABLE_HTTPS, CERT_FILE: certFile, KEY_FILE: keyFile, NODE_ENV } = process.env;

		const environment = 'test';
		const enableHttps = ENABLE_HTTPS === 'true';

		const port = Number(PORT);
		const host = HOST || 'localhost';

		const cert = certFile ? fs.readFileSync(certFile) : '';
		const key = keyFile ? fs.readFileSync(keyFile) : '';
		const servicesModule = new ServicesModule();

		const appTest = new AppConfig({ servicesModule, environment }).express;

		const appController = new ServerController(enableHttps, port, host, appTest, { cert, key });

		app = appController.exec();
	});

	it('should return divisors of number', async () => {
		const { body, status } = await request(app).get('/calc/45').send({ input: 45 });
		const expected: ICalc = {
			input: 45,
			dividers: [1, 3, 5, 9, 15, 45],
			primeDivisors: [3, 5],
		};

		expect(status).toBe(200);
		expect(body).toEqual(expected);
	});

	it('Should not insert a number valid', async () => {
		const { body, status } = await request(app).get('/calc/rr').send({ input: '45' });

		const expected = {
			status: 400,
			error: 'Erro ao Calcular numero, NaN',
		};

		expect(status).toBe(400);
		expect(body).toEqual(expected);
	});

	afterAll(() => {
		app.close();
	});
});
