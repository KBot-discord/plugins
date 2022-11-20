import type { CommandOptions } from '@sapphire/framework';

export interface ModuleConfig {
	/**
	 * Command options which will be applied to every {@link ModuleCommand}. Options set on the command itself will be prioritized.
	 */
	commands?: {
		options?: Omit<CommandOptions, 'name'>;
		guildIds?: string[];
	};
}
