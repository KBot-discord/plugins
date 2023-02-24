import { CommandConfigOptionsStrategy, ModuleConfig } from '../../src';

export const mockConfig: ModuleConfig = {
	commands: {
		strategy: CommandConfigOptionsStrategy.Overwrite,
		options: {
			enabled: false
		},
		guildIds: ['guild id']
	}
};
