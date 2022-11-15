import type { ModuleStore } from './lib/structures/ModuleStore';

export * from './lib/structures/Module';
export * from './lib/structures/ModuleCommand';
export * from './lib/types/Module';

declare module '@sapphire/pieces' {
	interface StoreRegistryEntries {
		modules: ModuleStore;
	}
}
