import { Listener } from '@sapphire/framework';
import { type ModuleErrorContext, ModuleEvents } from '../lib/types/ModuleEvents';
import type { Module } from '../lib/structures/Module';

export class ModuleListener extends Listener<typeof ModuleEvents.ModuleError> {
	public constructor(context: Listener.Context) {
		super(context, {
			event: ModuleEvents.ModuleError
		});
	}

	public run(error: any, module: Module, _context: ModuleErrorContext) {
		const { fullName } = module;
		this.container.logger.error(`[Modules Plugin] There was an error in module "${fullName}"\n`, error);
	}
}
