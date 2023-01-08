import { Precondition, Result } from '@sapphire/framework';
import { ModuleEvents } from '../lib/types/Events';
import { ModuleIdentifiers } from '../lib/errors/ModuleIdentifiers';
import type { Piece } from '@sapphire/framework';
import type { ChatInputModuleCommand, ModuleCommandInteractionUnion } from '../lib/structures/ModuleCommand';

export class ModulePrecondition extends Precondition {
	public constructor(context: Piece.Context, options: Precondition.Options) {
		super(context, { ...options });
	}

	public override async chatInputRun(interaction: ModuleCommandInteractionUnion, command: ChatInputModuleCommand, _context: Precondition.Context) {
		const { client } = this.container;
		const { module, disabledMessage } = command;

		const result = await Result.fromAsync(async () => {
			if (module.isEnabled) {
				client.emit(ModuleEvents.ModuleRun, module, { interaction, command });
				const data = await module.isEnabled(interaction.guild, interaction, command);

				if (typeof data !== 'boolean' && data.isErr()) {
					return data;
				}

				const result = typeof data === 'boolean' ? data : data.unwrap();

				client.emit(ModuleEvents.ModuleSuccess, module, { interaction, command, result });
				return module.ok(result);
			}
			client.emit(ModuleEvents.ModuleMissingIsEnabledHandler, module, { interaction, command });
			return module.error({
				identifier: ModuleIdentifiers.ModuleMissingIsEnabledHandler,
				message: `The module "${module.fullName}" is missing a "isEnabled" handler.`
			});
		});

		if (result.isErr()) {
			result.inspectErr((error) => {
				if (error.identifier !== ModuleEvents.ModuleMissingIsEnabledHandler) {
					client.emit(ModuleEvents.ModuleError, error, module, { interaction, command, result });
				}
			});
			return result;
		}

		return result.unwrap()
			? this.ok()
			: this.error({
					message: disabledMessage ?? `[${module.fullName}] The module for this command is disabled.`
			  });
	}
}
