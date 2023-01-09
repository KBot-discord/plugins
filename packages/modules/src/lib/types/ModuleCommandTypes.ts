import type { Command } from '@sapphire/framework';
import type { Module } from '../structures/Module';
import type { ModuleCommand } from '../structures/ModuleCommand';
import type { Modules } from '../structures/ModuleStore';
import type { CommandInteraction } from 'discord.js';

export type ModuleCommandDisabledMessageFunction = (moduleName: string, commandName: string) => string;

/**
 * Options to defer the interaction before {@link Module.isEnabled} is run.
 */
export interface ModuleCommandDeferOptions {
	/**
	 * Run {@link CommandInteraction.deferReply} on the interaction
	 */
	defer?: boolean;

	/**
	 * If {@link CommandInteraction.deferReply} should be set to {@link CommandInteraction.ephemeral}
	 * @default false
	 */
	ephemeral?: boolean;
}

export interface ModuleCommandOptions extends Command.Options {
	/**
	 * The {@link Module} that this command is associated with
	 */
	module: keyof Modules;

	/**
	 * How the precondition should handle deferrals before {@link Module.isEnabled} is run
	 * @remark This would be used in the case that {@link ModuleCommand} preconditions start taking too long and your interactions start timing out.
	 */
	deferOptions?: ModuleCommandDeferOptions;

	/**
	 * If the command options from {@link Module.config} should be applied to the command
	 * @default false
	 */
	applyConfigCommandOptions?: boolean;
}

export type ChatInputModuleCommand<M extends Module = Module> = ModuleCommand<M> & Required<Pick<ModuleCommand<M>, 'chatInputRun'>>;

export type ContextMenuModuleCommand<M extends Module = Module> = ModuleCommand<M> & Required<Pick<ModuleCommand<M>, 'contextMenuRun'>>;

export type ModuleCommandUnion<M extends Module = Module> = ChatInputModuleCommand<M> | ContextMenuModuleCommand<M>;

export type ModuleCommandInteractionUnion = ModuleCommand.ChatInputCommandInteraction | ModuleCommand.ContextMenuCommandInteraction;
