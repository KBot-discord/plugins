import type { Args, PieceContext } from '@sapphire/framework';
import type { CacheType } from 'discord.js';
import { Subcommand } from '@sapphire/plugin-subcommands';
import type { Module } from './Module';
import type { Store } from '@sapphire/pieces';
import { isNullish } from '@sapphire/utilities';

export class ModuleSubcommand<PreParseReturn extends Args = Args, O extends ModuleSubcommand.Options = ModuleSubcommand.Options> extends Subcommand<
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

export interface ModuleSubcommandOptions extends Subcommand.Options {
	moduleName: string;
}

export namespace ModuleSubcommand {
	export type Options = ModuleSubcommandOptions;
	export type JSON = Subcommand.JSON;
	export type Context = Subcommand.Context;
	export type RunInTypes = Subcommand.RunInTypes;
	export type ChatInputInteraction<Cached extends CacheType = CacheType> = Subcommand.ChatInputInteraction<Cached>;
	export type ContextMenuInteraction<Cached extends CacheType = CacheType> = Subcommand.ContextMenuInteraction<Cached>;
	export type AutocompleteInteraction<Cached extends CacheType = CacheType> = Subcommand.AutocompleteInteraction<Cached>;
	export type Registry = Subcommand.Registry;
}
