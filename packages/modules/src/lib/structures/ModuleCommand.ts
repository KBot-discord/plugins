import { ModuleNotFoundError } from '../errors/ModuleNotFoundError';
import { Command } from '@sapphire/framework';
import type { PieceContext } from '@sapphire/framework';
import type { CacheType } from 'discord.js';
import type { Module } from './Module';
import type { ModuleCommandMessageFunction, ModuleCommandOptions } from '../types/ModuleCommandTypes';
import type { Modules } from './ModuleStore';

export abstract class ModuleCommand<T extends Module = Module> extends Command {
	private readonly moduleName: string;

	/**
	 * Constructor for this instance of the {@link ModuleCommand} class
	 * @param context - The {@link PieceContext} to pass to the {@link ModuleCommand}
	 * @param options - The {@link ModuleCommandOptions} to pass to the {@link ModuleCommand}
	 */
	public constructor(context: ModuleCommand.Context, options: ModuleCommand.Options) {
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
	public disabledMessage: ModuleCommandMessageFunction = ModuleCommand.DisabledMessage;

	/**
	 * The message that will be shown to users if the associated {@link Module.isEnabled} functions throws an error
	 */
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public errorMessage: ModuleCommandMessageFunction = ModuleCommand.ErrorMessage;
}

export namespace ModuleCommand {
	export type Options = ModuleCommandOptions;
	export type JSON = Command.JSON;
	export type Context = Command.Context;
	export type RunInTypes = Command.RunInTypes;
	export type ChatInputCommandInteraction<Cached extends CacheType = CacheType> = Command.ChatInputCommandInteraction<Cached>;
	export type ContextMenuCommandInteraction<Cached extends CacheType = CacheType> = Command.ContextMenuCommandInteraction<Cached>;
	export type AutocompleteInteraction<Cached extends CacheType = CacheType> = Command.AutocompleteInteraction<Cached>;
	export type Registry = Command.Registry;
}
