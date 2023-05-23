import type { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import type { Module } from '../structures/Module';
import type { ModuleCommand } from '../structures/ModuleCommand';
import type { Modules } from '../structures/ModuleStore';

export interface ModuleCommandOptions extends Command.Options {
	/**
	 * The {@link Module} that this command is associated with
	 */
	module: keyof Modules;
}

export type ModuleCommandMessageFunction = (moduleName: string, commandName: string) => string;

export type ChatInputModuleCommand<M extends Module = Module> = ModuleCommand<M> & Required<Pick<ModuleCommand<M>, 'chatInputRun'>>;

export type ContextMenuModuleCommand<M extends Module = Module> = ModuleCommand<M> & Required<Pick<ModuleCommand<M>, 'contextMenuRun'>>;

export type MessageModuleCommand<M extends Module = Module> = ModuleCommand<M> & Required<Pick<ModuleCommand<M>, 'messageRun'>>;

export type ModuleCommandUnion<M extends Module = Module> = ChatInputModuleCommand<M> | ContextMenuModuleCommand<M> | MessageModuleCommand<M>;

export type ModuleCommandInteractionUnion = ModuleCommand.ChatInputCommandInteraction | ModuleCommand.ContextMenuCommandInteraction | Message;
