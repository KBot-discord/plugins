import { Command, container } from '@sapphire/framework';
import { CommandConfigOptionsStrategy } from '../types/ModuleConfig';
import { ModuleError } from '../errors/ModuleError';
import { ModuleIdentifiers } from '../errors/ModuleIdentifiers';
import type { CacheType } from 'discord.js';
import type { Module } from './Module';
import type { ModuleCommandDeferOptions, ModuleCommandDisabledMessageFunction, ModuleCommandOptions } from '../types/ModuleCommandTypes';

export abstract class ModuleCommand<T extends Module = Module> extends Command {
	/**
	 * The {@link Module} that this command is associated with
	 */
	public readonly module: T;

	/**
	 * How the precondition should handle deferrals before {@link Module.isEnabled} is run
	 */
	public readonly deferOptions: ModuleCommandDeferOptions | undefined;

	/**
	 * If the command options from {@link Module.config} should be applied to the command
	 * @default false
	 */
	public readonly applyConfigCommandOptions: boolean | undefined;

	/**
	 * Constructor for this instance of the {@link ModuleCommand} class
	 */
	public constructor(context: ModuleCommand.Context, options: ModuleCommand.Options) {
		const store = container.stores.get('modules');
		const module = store.get(options.module) as T | undefined;

		if (!module) {
			throw new ModuleError({
				identifier: ModuleIdentifiers.ModuleNotFound,
				moduleName: options.module,
				message: `[Modules Plugin] There was no module found with the name of "${options.module}" for the command "${context.name}" at "${context.path}". Please check that the module is registering properly.`
			});
		}

		const config = module.getConfig();
		let commandOptions: ModuleCommandOptions;

		if (
			module.validateConfig(config) &&
			config.commands?.options &&
			config.commands.strategy !== undefined &&
			config.commands.strategy !== CommandConfigOptionsStrategy.None
		) {
			if (config.commands.strategy === CommandConfigOptionsStrategy.Overwrite) {
				commandOptions = { ...options, ...config.commands.options };
			} else {
				commandOptions = { ...config.commands.options, ...options };
			}
		} else {
			commandOptions = { ...options };
		}

		super(context, commandOptions);

		this.module = module;
		this.deferOptions = options.deferOptions;
		this.applyConfigCommandOptions = options.applyConfigCommandOptions;

		this.module.commands.set(this.name, this);
	}

	/**
	 * The message that will be shown to users if the associated {@link Module} is disabled
	 */
	public disabledMessage: (moduleName: string, commandName: string) => string = ModuleCommand.disabledMessage;

	public static disabledMessage: ModuleCommandDisabledMessageFunction = //
		(moduleFullName: string) => `[${moduleFullName}] The module for this command is disabled.`;
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
