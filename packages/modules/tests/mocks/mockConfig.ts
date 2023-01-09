import { CommandConfigOptionsStrategy, ModuleConfig } from '../../src';

export const mockConfig: ModuleConfig = {
	commands: {
		strategy: CommandConfigOptionsStrategy.Global,
		options: {
			enabled: false
		},
		guildIds: ['guild id']
	}
};
