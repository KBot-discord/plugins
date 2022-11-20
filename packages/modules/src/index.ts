import type { ModuleStore } from './lib/structures/ModuleStore';
import type { ModulePluginOptions } from './lib/types/ModulePluginOptions';

export * from './lib/errors/ModuleIdentifiers';
export * from './lib/errors/ModuleError';
export * from './lib/structures/Module';
export * from './lib/structures/ModuleCommand';
export * from './lib/structures/ModuleStore';
export * from './lib/types/Events';
export * from './lib/types/ModuleConfig';
export * from './lib/types/ModulePluginOptions';

declare module '@sapphire/pieces' {
	interface StoreRegistryEntries {
		/**
		 * The store for modules
		 */
		modules: ModuleStore;
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		ModuleEnabled: never;
	}
}

declare module 'discord.js' {
	interface ClientOptions {
		/**
		 * Options for the modules plugin
		 */
		modules?: ModulePluginOptions;
	}
}
