import { ModuleEvents } from '../lib/types/ModuleEvents';
import { Listener } from '@sapphire/framework';
import type { Module } from '../lib/structures/Module';

export class ModuleListener extends Listener<typeof ModuleEvents.ModuleMissingIsEnabledHandler> {
	public constructor(context: Listener.Context) {
		super(context, {
			event: ModuleEvents.ModuleMissingIsEnabledHandler
		});
	}

	public run(module: Module): void {
		const { fullName } = module;
		this.container.logger.error(`[Modules Plugin] The module "${fullName}" is missing the "isEnabled" handler`);
	}
}
