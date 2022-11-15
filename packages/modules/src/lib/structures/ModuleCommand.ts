import type { Args, PieceContext } from '@sapphire/framework';
import type { CacheType } from 'discord.js';
import { Command } from '@sapphire/framework';
import { isNullish } from '@sapphire/utilities';
import type { Modules } from '../types/Module';

export class ModuleCommand<PreParseReturn extends Args = Args, O extends ModuleCommand.Options = ModuleCommand.Options> extends Command<
	PreParseReturn,
	O
> {
	public readonly moduleName: keyof Modules;

	public constructor(context: PieceContext, options: O) {
		super(context, {
			...options,
			preconditions: ['EnabledModule']
		});
		this.moduleName = options.module;

		const store = this.container.stores.get('modules');
		const module = store.get(this.moduleName);
		if (isNullish(module)) throw Error('Module not found.');
		module.addCommand(this);
	}
}

export interface ModuleCommandOptions extends Command.Options {
	module: keyof Modules;
}

export type ChatInputModuleCommand = ModuleCommand & Required<Pick<ModuleCommand, 'chatInputRun'>>;

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
