import './index';
import { join } from 'path';
import { Plugin, postInitialization, SapphireClient } from '@sapphire/framework';
import { ModuleStore } from './lib/structures/ModuleStore';

export class ModulesPlugin extends Plugin {
	public static [postInitialization](this: SapphireClient): void {
		const { options, stores } = this;

		if (options.modules?.enabled !== false) {
			stores.register(new ModuleStore());
			stores.get('preconditions').registerPath(join(__dirname, 'preconditions'));

			if (options.modules?.loadModuleErrorListeners !== false) {
				stores.get('listeners').registerPath(join(__dirname, 'listeners'));
			}
		}
	}
}

SapphireClient.plugins.registerPostInitializationHook(ModulesPlugin[postInitialization], 'Module-PostInitialization');
