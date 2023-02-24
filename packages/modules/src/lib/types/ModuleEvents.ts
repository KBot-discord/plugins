import type { Module } from '../structures/Module';
import type { ModuleCommandInteractionUnion, ModuleCommandUnion } from './ModuleCommandTypes';

export const ModuleEvents = {
	ModuleError: 'moduleError' as const,
	ModuleMissingIsEnabledHandler: 'moduleMissingIsEnabledHandler' as const
};

export interface ModuleBaseContext {
	interaction: ModuleCommandInteractionUnion;
	command: ModuleCommandUnion;
}

export interface ModuleErrorContext extends ModuleBaseContext {
	result: unknown;
}

export interface ModuleMissingHandlerContext extends ModuleBaseContext {}

declare module 'discord.js' {
	interface ClientEvents {
		[ModuleEvents.ModuleError]: [error: unknown, module: Module, context: ModuleErrorContext];
		[ModuleEvents.ModuleMissingIsEnabledHandler]: [module: Module, context: ModuleMissingHandlerContext];
	}
}
