import { Plugin, postInitialization, SapphireClient } from '@sapphire/framework';
import './index';
import { ModuleStore } from './lib/structures/ModuleStore';

export class ModulesPlugin extends Plugin {
	public service: string | undefined;

	public static [postInitialization](this: SapphireClient): void {
		this.stores.register(new ModuleStore());
	}
}

SapphireClient.plugins.registerPostInitializationHook(ModulesPlugin[postInitialization], 'Module-PostInitialization');
