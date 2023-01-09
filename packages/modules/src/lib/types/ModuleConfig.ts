import type { CommandOptions } from '@sapphire/framework';
import type { Guild } from 'discord.js';

/**
 * The different strategies for applying the command options in the {@link ModuleConfig}
 */
export enum CommandConfigOptionsStrategy {
	/** @param Global If the command options should be applied to every command and ignore the command-specific strategy */
	Global,
	/** @param Scoped If the command options should be applied to every command and prioritize the command-specific strategy */
	Scoped,
	/** @param None If the command options should be applied to every command */
	None
}

export interface ModuleConfig {
	/**
	 * Options for commands which will use this module {@link ModuleConfig}. Options set on the command itself will be prioritized.
	 */
	commands?: {
		/**
		 * How command options should be resolved
		 */
		strategy?: CommandConfigOptionsStrategy;

		/**
		 * The {@link CommandOptions} to apply
		 */
		options?: Omit<CommandOptions, 'name'>;

		/**
		 * The {@link Guild}s where the commands will be registered
		 */
		guildIds?: string[];
	};
}
