import type { CommandOptions } from '@sapphire/framework';
import type { Guild } from 'discord.js';

/**
 * The different strategies for applying the {@link CommandOptions} in the {@link ModuleConfig}
 */
export enum CommandConfigOptionsStrategy {
	/** @param Overwrite Prioritizes the command options set in the {@link ModuleConfig} */
	Overwrite,
	/** @param Default Prioritizes the command options set in {@link ModuleCommandOptions} */
	Default,
	/** @param None Ignore the options in {@link ModuleConfig} */
	None
}

export interface ModuleConfig {
	/**
	 * Options for commands which will use this module.
	 */
	commands?: {
		/**
		 * How command options should be resolved.
		 */
		strategy?: CommandConfigOptionsStrategy;

		/**
		 * The {@link CommandOptions} to apply
		 */
		options?: Omit<CommandOptions, 'name'>;

		// TODO: Need to find a way to apply this
		/**
		 * The {@link Guild}s where the commands will be registered
		 */
		guildIds?: string[];
	};
}
