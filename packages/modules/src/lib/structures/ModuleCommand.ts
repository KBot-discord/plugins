import { Command, container } from '@sapphire/framework';
import type { CacheType } from 'discord.js';
import type { Modules, ModuleStore } from './ModuleStore';
import type { Module } from './Module';

export abstract class ModuleCommand<T extends Module = Module> extends Command {
	private readonly moduleStore: ModuleStore;
	private readonly moduleName: keyof Modules;

	public readonly disabledMessage: string | undefined;

	public constructor(context: ModuleCommand.Context, options: ModuleCommand.Options) {
		const store = container.stores.get('modules');
		const module = store.get(options.module) as T;

		super(context, { ...module?.config?.commands?.options, ...options });

		this.moduleStore = store;
		this.moduleName = module.name as keyof Modules;
		this.disabledMessage = options.disabledMessage;
	}

	public get module(): T {
		const module = this.moduleStore.get(this.moduleName);
		if (!module) {
			throw Error('Module not found');
		}
		return module as T;
	}
}

export interface ModuleCommandOptions extends Command.Options {
	/**
	 * The module that this command is associated with
	 */
	module: keyof Modules;

	/**
	 * The message that will be shown to the user if module for the command is disabled
	 * @default "[{@link Module.fullName}] The module for this command is disabled."
	 */
	disabledMessage?: string;
}

export type ChatInputModuleCommand<T extends Module = Module> = ModuleCommand<T> & Required<Pick<ModuleCommand<T>, 'chatInputRun'>>;

export namespace ModuleCommand {
	export type Options = ModuleCommandOptions;
	export type JSON = Command.JSON;
	export type Context = Command.Context;
	export type RunInTypes = Command.RunInTypes;
	export type ChatInputInteraction<Cached extends CacheType = CacheType> = Command.ChatInputInteraction<Cached>;
	export type ContextMenuInteraction<Cached extends CacheType = CacheType> = Command.ContextMenuInteraction<Cached>;
	export type AutocompleteInteraction<Cached extends CacheType = CacheType> = Command.AutocompleteInteraction<Cached>;
	export type Registry = Command.Registry;
}
