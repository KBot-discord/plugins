import { describe, test, expect } from 'vitest';
import type { ModuleConfig } from '../../../src';
import { getMockModule } from '../../mocks/Client';
import type { MockModule } from '../../mocks/modules/MockModule';

describe('Module', () => {
	let module: MockModule;

	const config: ModuleConfig = {
		commands: {
			options: {
				enabled: false
			},
			guildIds: ['guild id']
		}
	};

	beforeEach(() => {
		module = getMockModule();
	});

	describe('config handling', () => {
		test('set config', () => {
			const result = module?.setConfig(config);

			expect(result).toStrictEqual(config);
		});

		test('get config', () => {
			const result = module?.config;

			expect(result).toStrictEqual(config);
		});

		test('validate config', () => {
			const currentConfig = module?.config;

			const result = module?.validateConfig(currentConfig);

			expect(result).toStrictEqual(true);
		});
	});
});
