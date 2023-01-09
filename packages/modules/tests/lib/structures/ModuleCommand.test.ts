import { describe, test, expect } from 'vitest';
import { ModuleCommand } from '../../../dist';
import { getMockModuleCommand } from '../../mocks/mockClient';

describe('ModuleCommand', () => {
	test('GIVEN mock disabledMessage RETURN the mock message', () => {
		const command = getMockModuleCommand();

		const result = command.disabledMessage(command.module.name, command.name);

		expect(result).toBe(`[${command.module.name}] Mock disabled message.`);
	});

	test('GIVEN no set disabledMessage RETURN the default message', () => {
		const command = getMockModuleCommand();

		command.disabledMessage = ModuleCommand.disabledMessage;
		const result = command.disabledMessage(command.module.name, command.name);

		expect(result).toBe(`[${command.module.name}] The module for this command is disabled.`);
	});
});
