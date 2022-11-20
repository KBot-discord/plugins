import type { ModuleCommand } from '../structures/ModuleCommand';
import type { Module } from '../structures/Module';

export const ModuleEvents = {
	ModuleRun: 'moduleRun' as const,
	ModuleSuccess: 'moduleSuccess' as const,
	ModuleError: 'moduleError' as const,

	ModuleMissingIsEnabledHandler: 'moduleMissingIsEnabledHandler' as const
};

export interface ModuleBaseContext {
	interaction: ModuleCommand.ChatInputInteraction;
	command: Module.Command;
}

export interface ModuleRunContext extends ModuleBaseContext {}

export interface ModuleSuccessContext extends ModuleBaseContext {
	result: unknown;
}

export interface ModuleErrorContext extends ModuleBaseContext {
	result: unknown;
}

export interface ModuleMissingHandlerContext extends ModuleBaseContext {}

declare module 'discord.js' {
	interface ClientEvents {
		[ModuleEvents.ModuleRun]: [module: Module, context: ModuleRunContext];
		[ModuleEvents.ModuleSuccess]: [module: Module, context: ModuleSuccessContext];
		[ModuleEvents.ModuleError]: [error: unknown, module: Module, context: ModuleErrorContext];

		[ModuleEvents.ModuleMissingIsEnabledHandler]: [module: Module, context: ModuleMissingHandlerContext];
	}
}
