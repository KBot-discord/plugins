import type { Module } from './lib/structures/Module';
import type { ModuleStore } from './lib/structures/ModuleStore';
import type { ModulePluginOptions } from './lib/types/ModulePluginOptions';

export * from './lib/errors/ModuleError';
export * from './lib/errors/ModuleIdentifiers';
export * from './lib/structures/Module';
export * from './lib/structures/ModuleCommand';
export * from './lib/structures/ModuleStore';
export * from './lib/types/ModuleEvents';
export * from './lib/types/ModuleTypes';
export * from './lib/types/ModuleConfig';
export * from './lib/types/ModulePluginOptions';
export * from './lib/types/ModuleCommandTypes';

declare module '@sapphire/pieces' {
	interface StoreRegistryEntries {
		/**
		 * The store for {@link Module}s
		 */
		modules: ModuleStore;
	}
}

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
