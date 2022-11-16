import { Precondition } from '@sapphire/framework';
import type { Piece } from '@sapphire/pieces';
import type { ChatInputModuleCommand } from '../lib/structures/ModuleCommand';
import { Identifiers } from '../lib/errors/Identifiers';
import type { CommandInteraction } from 'discord.js';
import type { Module } from '../lib/structures/Module';
import type { Modules } from '../lib/types/Module';
import { isNullish } from '@sapphire/utilities';

export class EnabledModulePrecondition extends Precondition {
	public constructor(context: Piece.Context, options: ModulePreconditionOptions) {
		super(context, { ...options });
	}

	public override async chatInputRun(interaction: CommandInteraction, command: ChatInputModuleCommand, _context: Precondition.Context) {
		const module = this.getModule(command.moduleName);

		if (module.skipModuleCheck || !(await module.isModuleEnabled(interaction.guildId!))) {
			return this.error({
				identifier: Identifiers.ModuleDisabled,
				message: `[${module.fullName ?? module.name}] The module for this command is disabled.`
			});
		}

		if (module.skipModuleCheck) return this.ok();

		return (await module.isModuleCommandEnabled(command, interaction.guildId!))
			? this.ok()
			: this.error({
					identifier: Identifiers.ModuleDisabled,
					message: `[${module.fullName ?? module.name}] This command is not enabled.`
			  });
	}

	private getModule(moduleName: keyof Modules): Module {
		const store = this.container.stores.get('modules');
		const module = store.get(moduleName);
		if (isNullish(module)) throw Error('Module not found.');
		return module;
	}
}

export interface ModulePreconditionOptions extends Precondition.Options {}

export namespace ModulePrecondition {
	export type Options = ModulePreconditionOptions;
	export type Context = Precondition.Context;
	export type Result = Precondition.Result;
	export type AsyncResult = Precondition.AsyncResult;
}

declare module '@sapphire/framework' {
	interface Preconditions {
		EnabledModule: never;
	}
}
