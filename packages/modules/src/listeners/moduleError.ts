import { ModuleEvents } from '../lib/types/ModuleEvents';
import { Listener } from '@sapphire/framework';
import type { Module } from '../lib/structures/Module';

export class ModuleListener extends Listener<typeof ModuleEvents.ModuleError> {
	public constructor(context: Listener.Context) {
		super(context, {
			event: ModuleEvents.ModuleError
		});
	}

	public run(error: unknown, module: Module): void {
		const { fullName } = module;
		this.container.logger.error(`[Modules Plugin] There was an error in module "${fullName}"\n`, error);
	}
}
