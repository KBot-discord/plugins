import './index';
import { join } from 'path';
import { Plugin, postInitialization, SapphireClient } from '@sapphire/framework';

export class ModulesPlugin extends Plugin {
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

SapphireClient.plugins.registerPostInitializationHook(ModulesPlugin[postInitialization], 'Module-PostInitialization');
