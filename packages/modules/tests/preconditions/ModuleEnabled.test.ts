import { describe, test, expect } from 'vitest';
import { getMockModuleCommand, getModuleEnabledPrecondition } from '../mocks/mockClient';
import type { ChatInputModuleCommand, ModuleCommand } from '@kbotdev/plugin-modules';

describe('ModuleEnabled', () => {
	let mockCommand: ChatInputModuleCommand;
	const mockInteraction = {} as ModuleCommand.ChatInputCommandInteraction;
	const mockContext = {};

	beforeEach(() => {
		mockCommand = getMockModuleCommand() as ChatInputModuleCommand;
	});

	test('GIVEN module has isEnabled RETURN ok', async () => {
		const precondition = getModuleEnabledPrecondition();

		const result = await precondition.chatInputRun!(mockInteraction, mockCommand, mockContext);

		expect(result.isOk()).toBe(true);
	});

	test('GIVEN module has no isEnabled RETURN error', async () => {
		mockCommand.module.isEnabled = undefined;

		const precondition = getModuleEnabledPrecondition();

		const result = await precondition.chatInputRun!(mockInteraction, mockCommand, mockContext);
		const resultUnwrapped = result.unwrapErr();

		expect(result.isErr()).toBe(true);
		expect(resultUnwrapped).instanceOf(Error);
		expect(resultUnwrapped.name).toBe('PreconditionError');
		expect(resultUnwrapped.message).toBe(`[${mockCommand.module.fullName}] Something went wrong while handling this request.`);
		expect(resultUnwrapped.identifier).toBe('ModuleEnabled');
	});
});
