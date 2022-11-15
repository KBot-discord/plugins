import type { ModuleStore } from './lib/structures/ModuleStore';

export * from './lib/structures/Module';
export * from './lib/structures/ModuleCommand';
export * from './lib/structures/ModuleSubcommand';

declare module '@sapphire/pieces' {
	interface StoreRegistryEntries {
		modules: ModuleStore;
	}
}

declare module 'discord.js' {
	interface ClientOptions {
		loadSubcommandErrorListeners?: boolean;
	}
}
