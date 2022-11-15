import { Plugin, postInitialization, SapphireClient } from '@sapphire/framework';
import { join } from 'path';
import './index';
import { ModuleStore } from './lib/structures/ModuleStore';

export class ModulesPlugin extends Plugin {
	public static [postInitialization](this: SapphireClient): void {
		this.stores.register(new ModuleStore());
		this.stores.get('preconditions').registerPath(join(__dirname, 'preconditions'));
	}
}

SapphireClient.plugins.registerPostInitializationHook(ModulesPlugin[postInitialization], 'Module-PostInitialization');
