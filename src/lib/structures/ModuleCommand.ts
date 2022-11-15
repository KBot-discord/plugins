import type { Args, PieceContext } from '@sapphire/framework';
import type { CacheType } from 'discord.js';
import { Command, Store } from '@sapphire/framework';
import { isNullish } from '@sapphire/utilities';
import type { Module } from './Module';

export class ModuleCommand<PreParseReturn extends Args = Args, O extends ModuleCommand.Options = ModuleCommand.Options> extends Command<
	PreParseReturn,
	O
> {
	public constructor(context: PieceContext, options: O) {
		super(context, {
			...options,
			preconditions: ['EnabledModule']
		});

		const store = this.store as Store<Module>;
		const module = store.get(options.moduleName);
		if (isNullish(module)) throw Error('Module not found.');

		module.addCommand(this);
	}
}

export interface ModuleCommandOptions extends Command.Options {
	moduleName: string;
}

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
