import type { ChatInputModuleCommand, ModuleCommand } from '@kbotdev/plugin-modules';
import { describe, test, expect } from 'vitest';
import { getMockModuleCommand, mockClient } from '../mocks/Client';

describe('ModuleEnabled', () => {
	let mockCommand: ChatInputModuleCommand;
	const mockInteraction = {} as ModuleCommand.ChatInputCommandInteraction;
	const mockContext = {};

	beforeEach(() => {
		mockCommand = getMockModuleCommand() as ChatInputModuleCommand;
	});

	test('if isEnabled, return ok', async () => {
		const precondition = mockClient.stores.get('preconditions').get('ModuleEnabled')!;

		const result = await precondition.chatInputRun!(mockInteraction, mockCommand, mockContext);

		expect(result.isOk()).toBeTypeOf('boolean');
		expect(result.isOk()).toBe(true);
	});

	test('if no isEnabled, return err', async () => {
		mockCommand.module.isEnabled = undefined;

		const precondition = mockClient.stores.get('preconditions').get('ModuleEnabled')!;

		const result = await precondition.chatInputRun!(mockInteraction, mockCommand, mockContext);

		expect(result.isErr()).toBeTypeOf('boolean');
		expect(result.isErr()).toBe(true);
	});
});
