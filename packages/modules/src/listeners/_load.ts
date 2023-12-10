import { ModuleListener as PluginModuleMissingEnabledHandler } from './moduleMissingEnabledHandler';
import { ModuleListener as PluginModuleError } from './moduleError';
import { container } from '@sapphire/pieces';

export function loadListeners(): void {
	void container.stores.loadPiece({
		name: 'PluginModuleError',
		piece: PluginModuleError,
		store: 'listeners'
	});

	void container.stores.loadPiece({
		name: 'PluginModuleMissingEnabledHandler',
		piece: PluginModuleMissingEnabledHandler,
		store: 'listeners'
	});
}
