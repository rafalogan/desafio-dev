import { server } from '../../src/server';
import request from 'supertest';

describe('App', () => {
	let app: any;
	beforeAll(async () => app = server.start());

	it('should display welcome message', async () => {
		const response = await request(app).get('/');

		expect(response.status).toBe(400);
	});
});
