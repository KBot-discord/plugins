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

		if (command.deferOptions?.defer === true && (!interaction.replied || !interaction.deferred)) {
			const deferResult = await Result.fromAsync(async () => {
				await interaction.deferReply({ ephemeral: command.deferOptions?.ephemeral });
				return module.ok();
			});
			if (deferResult.isErr()) {
				client.emit(ModuleEvents.ModuleError, deferResult.unwrapErr(), module, { interaction, command, result: deferResult });
			}
		}

		const result = await Result.fromAsync(async () => {
			if (module.isEnabled) {
				client.emit(ModuleEvents.ModuleRun, module, { interaction, command });
				const data = await module.isEnabled({ guild: interaction.guild, interaction, command });

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
			return this.error({
				message: `[${module.fullName}] Something went wrong while handling this request.`
			});
		}

		if (result.unwrap()) return this.ok();
		return this.error({ message: command.disabledMessage(module.fullName, command.name) });
	}
}
