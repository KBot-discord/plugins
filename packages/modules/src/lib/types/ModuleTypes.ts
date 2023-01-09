import type { Piece } from '@sapphire/framework';
import type { Guild } from 'discord.js';
import type { ModuleCommandInteractionUnion, ModuleCommandUnion } from './ModuleCommandTypes';

/**
 * The context that is passed from {@link ModuleEnabledPrecondition}
 */
export interface IsEnabledContext {
	/**
	 * The {@link Guild} that the command was run in, or null if in DMs
	 */
	guild: Guild | null;

	/**
	 * The interaction that was received from Discord
	 */
	interaction: ModuleCommandInteractionUnion;

	/**
	 * The {@link ModuleCommand} associated with {@link IsEnabledContext.interaction}
	 */
	command: ModuleCommandUnion;
}

/**
 * The options for the {@link Module}
 */
export interface ModuleOptions extends Piece.Options {
	/**
	 * The name that will be displayed to users if the {@link Module} is disabled
	 */
	fullName: string;

	/**
	 * The description of the {@link Module}
	 */
	description?: string;
}
