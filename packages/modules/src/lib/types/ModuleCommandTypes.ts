import type { Module } from '../structures/Module';
import type { ModuleCommand } from '../structures/ModuleCommand';

export type ModuleCommandDisabledMessageFunction = (moduleName: string, commandName: string) => string;

export type ChatInputModuleCommand<M extends Module = Module> = ModuleCommand<M> & Required<Pick<ModuleCommand<M>, 'chatInputRun'>>;

export type ContextMenuModuleCommand<M extends Module = Module> = ModuleCommand<M> & Required<Pick<ModuleCommand<M>, 'contextMenuRun'>>;

export type ModuleCommandUnion<M extends Module = Module> = ChatInputModuleCommand<M> | ContextMenuModuleCommand<M>;

export type ModuleCommandInteractionUnion = ModuleCommand.ChatInputCommandInteraction | ModuleCommand.ContextMenuCommandInteraction;
