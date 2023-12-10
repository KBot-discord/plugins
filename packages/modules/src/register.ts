import { loadListeners, loadPreconditions } from './index';
import { ModuleStore } from './lib/structures/ModuleStore';
import { Plugin, SapphireClient, postInitialization, preInitialization } from '@sapphire/framework';

export class ModulesPlugin extends Plugin {
	public static [preInitialization](this: SapphireClient): void {
		const { options, stores } = this;

		if (options.modules?.enabled !== false) {
			stores.register(new ModuleStore());
		}
	}

	public static [postInitialization](this: SapphireClient): void {
		const { options } = this;

		if (options.modules?.enabled !== false) {
			loadPreconditions();

			if (options.modules?.loadModuleErrorListeners !== false) {
				loadListeners();
			}
		}
	}
}

SapphireClient.plugins.registerPreInitializationHook(ModulesPlugin[preInitialization], 'Module-PreInitialization');
SapphireClient.plugins.registerPostInitializationHook(ModulesPlugin[postInitialization], 'Module-PostInitialization');
