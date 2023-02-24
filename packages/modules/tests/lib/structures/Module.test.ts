import { describe, test, expect } from 'vitest';
import { getMockModule } from '../../mocks/mockClient';
import { Module, ModuleError, ModuleIdentifiers } from '../../../src';
import { Piece } from '@sapphire/framework';
import { mockConfig } from '../../mocks/mockConfig';

describe('Module', () => {
	let module: Module;

	beforeEach(() => {
		module = getMockModule();
	});

	describe('Module result', () => {
		test('GIVEN ok() RETURN undefined', () => {
			const result = module.ok();

			expect(result.isOk()).toBe(true);
			expect(result.unwrap()).toBe(undefined);
		});

		test('GIVEN ok(true) RETURN true', () => {
			const result = module.ok(true);

			expect(result.isOk()).toBe(true);
			expect(result.unwrap()).toBe(true);
		});

		test('GIVEN error() RETURN error', () => {
			const result = module.error();

			expect(result.isErr()).toBe(true);
			expect(result.unwrapErr()).instanceOf(Error);
		});

		test('GIVEN error(ModuleError.Options) RETURN ModuleError', () => {
			const error = new ModuleError({
				module,
				moduleName: module.name,
				identifier: ModuleIdentifiers.ModuleMissingIsEnabledHandler
			});

			const result = module.error(error);
			const resultUnwrapped = result.unwrapErr();

			expect(result.isErr()).toBe(true);
			expect(resultUnwrapped).instanceOf(Error);
			expect(resultUnwrapped.module).instanceOf(Piece);
			expect(resultUnwrapped.name).toBe('ModuleError');
			expect(resultUnwrapped.message).toBe('');
			expect(resultUnwrapped.identifier).toBe(ModuleIdentifiers.ModuleMissingIsEnabledHandler);
		});
	});

	describe('Module config', () => {
		test('GIVEN no config RETURN the set config', () => {
			const result = module.setConfig(mockConfig);

			expect(result).toBe(undefined);
		});

		test('GIVEN a set config RETURN the config', () => {
			const result = module.getConfig();

			expect(result).toStrictEqual(mockConfig);
		});

		test('GIVEN invalid config RETURN false', () => {
			const currentConfig = undefined;

			const result = module.validateConfig(currentConfig);

			expect(result).toBe(false);
		});

		test('GIVEN valid config RETURN true', () => {
			const currentConfig = module.getConfig();

			const result = module.validateConfig(currentConfig);

			expect(result).toBe(true);
		});
	});
});
