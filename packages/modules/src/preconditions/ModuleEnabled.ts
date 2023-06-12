import { ModuleEvents } from '../lib/types/ModuleEvents';
import { ModuleIdentifiers } from '../lib/errors/ModuleIdentifiers';
import { Precondition, Result } from '@sapphire/framework';
import type { UserError } from '@sapphire/framework';
import type {
	ChatInputModuleCommand,
	ContextMenuModuleCommand,
	MessageModuleCommand,
	ModuleCommandInteractionUnion,
	ModuleCommandUnion
} from '../lib/types/ModuleCommandTypes';
import type { Message } from 'discord.js';

export class ModuleEnabledPrecondition extends Precondition {
	public override async chatInputRun(
		interaction: ModuleCommandInteractionUnion,
		command: ChatInputModuleCommand
	): Promise<Result<unknown, UserError>> {
		return this.run(interaction, command);
	}

	public override async contextMenuRun(
		interaction: ModuleCommandInteractionUnion,
		command: ContextMenuModuleCommand
	): Promise<Result<unknown, UserError>> {
		return this.run(interaction, command);
	}

	public override async messageRun(
		message: Message, //
		command: MessageModuleCommand
	): Promise<Result<unknown, UserError>> {
		return this.run(message, command);
	}

	private async run(interaction: ModuleCommandInteractionUnion, command: ModuleCommandUnion): Promise<Result<unknown, UserError>> {
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
				message: command.errorMessage(module.fullName, command.name)
			});
		}

		if (result.unwrap()) {
			return this.ok();
		}

		return this.error({
			message: command.disabledMessage(module.fullName, command.name)
		});
	}
}
