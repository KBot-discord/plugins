import { Listener } from '@sapphire/framework';
import { ModuleEvents } from '../lib/types/Events';
import type { Module } from '../lib/structures/Module';

export class ModuleListener extends Listener<typeof ModuleEvents.ModuleMissingIsEnabledHandler> {
	public constructor(context: Listener.Context) {
		super(context, {
			event: ModuleEvents.ModuleMissingIsEnabledHandler
		});
	}

	public run(module: Module) {
		const { fullName, location } = module;
		this.container.logger.error(`[Modules Plugin]: The module "${fullName}" is missing the "isEnabled" handler at path "${location.full}"`);
	}
}
