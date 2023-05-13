import { Precondition, Result } from '@sapphire/framework';
import { ModuleEvents } from '../lib/types/ModuleEvents';
import { ModuleIdentifiers } from '../lib/errors/ModuleIdentifiers';
import type { Piece } from '@sapphire/framework';
import type { ModuleCommandInteractionUnion, ChatInputModuleCommand, ContextMenuModuleCommand } from '../lib/types/ModuleCommandTypes';

export class ModuleEnabledPrecondition extends Precondition {
	public constructor(context: Piece.Context, options: Precondition.Options) {
		super(context, { ...options });
	}

	public override async chatInputRun(interaction: ModuleCommandInteractionUnion, command: ChatInputModuleCommand, context: Precondition.Context) {
		return this.run(interaction, command, context);
	}

	public override async contextMenuRun(
		interaction: ModuleCommandInteractionUnion,
		command: ContextMenuModuleCommand,
		context: Precondition.Context
	) {
		return this.run(interaction, command, context);
	}

	private async run(
		interaction: ModuleCommandInteractionUnion,
		command: ChatInputModuleCommand | ContextMenuModuleCommand,
		_context: Precondition.Context
	) {
		const { client } = this.container;
		const { module } = command;

		const result = await Result.fromAsync(async () => {
			if (module.isEnabled) {
				const data = await module.isEnabled({ guild: interaction.guild, interaction, command });

				if (typeof data !== 'boolean' && data.isErr()) {
					return data;
				}

				const result = typeof data === 'boolean' ? data : data.unwrap();

				return module.ok(result);
			}
			client.emit(ModuleEvents.ModuleMissingIsEnabledHandler, module, { interaction, command });
			return module.error({
				identifier: ModuleIdentifiers.ModuleMissingIsEnabledHandler,
				moduleName: module.fullName,
				message: `The module "${module.fullName}" is missing a "isEnabled" handler.`
			});
		});

		if (result.isErr()) {
			result.inspectErr((error) => {
				if (error.identifier !== ModuleEvents.ModuleMissingIsEnabledHandler) {
					client.emit(ModuleEvents.ModuleError, error, module, { interaction, command, result });
				}
			});
			return this.error({
				message: `[${module.fullName}] Something went wrong while handling this request.`
			});
		}

		if (result.unwrap()) return this.ok();
		return this.error({ message: command.disabledMessage(module.fullName, command.name) });
	}
}
