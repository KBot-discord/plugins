import './index';
import { join } from 'path';
import { Plugin, postInitialization, preInitialization, SapphireClient } from '@sapphire/framework';
import { ModuleStore } from './lib/structures/ModuleStore';

export class ModulesPlugin extends Plugin {
	public static [preInitialization](this: SapphireClient): void {
		const { options, stores } = this;

		if (options.modules?.enabled !== false) {
			stores.register(new ModuleStore());
		}
	}

	public static [postInitialization](this: SapphireClient): void {
		const { options, stores } = this;

		if (options.modules?.enabled !== false) {
			stores.get('preconditions').registerPath(join(__dirname, 'preconditions'));

			if (options.modules?.loadModuleErrorListeners !== false) {
				stores.get('listeners').registerPath(join(__dirname, 'listeners'));
			}
		}
	}
}

SapphireClient.plugins.registerPreInitializationHook(ModulesPlugin[preInitialization], 'Module-PreInitialization');
SapphireClient.plugins.registerPostInitializationHook(ModulesPlugin[postInitialization], 'Module-PostInitialization');
