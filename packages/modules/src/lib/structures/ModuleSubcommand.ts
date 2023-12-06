import { ModuleNotFoundError } from '../errors/ModuleNotFoundError';
import { Subcommand } from '@sapphire/plugin-subcommands';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { LoaderPieceContext } from '@sapphire/framework';
import type { CacheType } from 'discord.js';
import type { Module } from './Module';
import type { ModuleCommandMessageFunction, ModuleSubcommandOptions } from '../types/ModuleCommandTypes';
import type { Modules } from './ModuleStore';

export abstract class ModuleSubcommand<T extends Module = Module> extends Subcommand {
	private readonly moduleName: string;

	/**
	 * Constructor for this instance of the {@link ModuleSubcommand} class
	 * @param context - The {@link LoaderPieceContext} to pass to the {@link ModuleSubcommand}
	 * @param options - The {@link ModuleSubcommandOptions} to pass to the {@link ModuleSubcommand}
	 */
	public constructor(context: ModuleSubcommand.LoaderContext, options: ModuleSubcommand.Options) {
		super(context, options);

		this.moduleName = options.module;
	}

	/**
	 * The {@link Module} that this command is associated with
	 */
	public get module(): T {
		const store = this.container.stores.get('modules');
		const module = store.get(this.moduleName as keyof Modules);

		if (!module) {
			throw new ModuleNotFoundError({ moduleName: this.moduleName });
		}

		return module as T;
	}

	/**
	 * The default disabled message
	 */
	public static DisabledMessage: ModuleCommandMessageFunction = //
		(moduleFullName: string) => `[${moduleFullName}] The module for this command is disabled.`;

	/**
	 * The default error message
	 */
	public static ErrorMessage: ModuleCommandMessageFunction = //
		(moduleFullName: string) => `[${moduleFullName}] Something went wrong while handling this request.`;

	/**
	 * The message that will be shown to users if the associated {@link Module} is disabled
	 */
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public disabledMessage: ModuleCommandMessageFunction = ModuleSubcommand.DisabledMessage;

	/**
	 * The message that will be shown to users if the associated {@link Module.isEnabled} functions throws an error
	 */
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public errorMessage: ModuleCommandMessageFunction = ModuleSubcommand.ErrorMessage;
}

export namespace ModuleSubcommand {
	export type Options = ModuleSubcommandOptions;
	export type JSON = Subcommand.JSON;
	export type LoaderContext = Subcommand.LoaderContext;
	export type RunInTypes = Subcommand.RunInTypes;
	export type ChatInputCommandInteraction<Cached extends CacheType = CacheType> = Subcommand.ChatInputCommandInteraction<Cached>;
	export type ContextMenuCommandInteraction<Cached extends CacheType = CacheType> = Subcommand.ContextMenuCommandInteraction<Cached>;
	export type AutocompleteInteraction<Cached extends CacheType = CacheType> = Subcommand.AutocompleteInteraction<Cached>;
	export type Registry = Subcommand.Registry;
}
