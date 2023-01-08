import { describe, test, expect } from 'vitest';
import { ModuleCommand } from '../../../dist';
import { getMockModuleCommand } from '../../mocks/Client';

describe('ModuleCommand', () => {
	test('get module from command', () => {
		const command = getMockModuleCommand();

		expect(command instanceof ModuleCommand).toBe(true);
	});
});
