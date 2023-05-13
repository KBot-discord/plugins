import type { Module } from './lib/structures/Module';
import type { ModulePluginOptions } from './lib/types/ModulePluginOptions';

export * from './lib/errors/ModuleError';
export * from './lib/errors/ModuleIdentifiers';
export * from './lib/structures/Module';
export * from './lib/structures/ModuleCommand';
export * from './lib/types/ModuleEvents';
export * from './lib/types/ModuleTypes';
export * from './lib/types/ModuleConfig';
export * from './lib/types/ModulePluginOptions';
export * from './lib/types/ModuleCommandTypes';

declare module '@sapphire/framework' {
	interface Preconditions {
		/**
		 * Runs {@link Module.isEnabled} before the command is run
		 */
		ModuleEnabled: never;
	}
}

declare module 'discord.js' {
	interface ClientOptions {
		/**
		 * Options for the {@link Module} plugin
		 */
		modules?: ModulePluginOptions;
	}
}
