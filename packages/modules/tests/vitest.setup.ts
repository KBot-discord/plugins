import { afterAll } from 'vitest';
import { mockClient } from './mocks/Client';

beforeAll(async () => {
	const moduleStore = mockClient.stores.get('modules');
	await moduleStore.load(__dirname, './mocks/dist/modules/MockModule.js');

	const preconditionsStore = mockClient.stores.get('preconditions');
	await preconditionsStore.load(__dirname, '../dist/preconditions/ModuleEnabled.js');

	const commandStore = mockClient.stores.get('commands');
	await commandStore.load(__dirname, './mocks/dist/commands/MockModuleCommand.js');
});

afterAll(() => {
	mockClient.destroy();
});
