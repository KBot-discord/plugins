import { afterAll, beforeAll } from 'vitest';
import { client } from './mocks/Client';

beforeAll(() => {});

afterAll(() => {
	client.destroy();
});
