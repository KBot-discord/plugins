import { Command, CommandOptions } from '@sapphire/framework';
import { CommandOptionsStrategy } from '../types/ModuleConfig';
import type { PieceContext } from '@sapphire/framework';
import type { CacheType } from 'discord.js';
import type { Module } from './Module';
import type { ModuleCommandDisabledMessageFunction } from '../types/ModuleCommandTypes';

export abstract class ModuleCommand<T extends Module = Module> extends Command {
	/**
	 * The {@link Module} that this command is associated with
	 */
	public readonly module: T;

	/**
	 * Constructor for this instance of the {@link ModuleCommand} class
	 * @param context The {@link PieceContext} to pass to the {@link ModuleCommand}
	 * @param options The {@link ModuleCommandOptions} to pass to the {@link ModuleCommand}
	 * @param module The {@link Module} that this command is associated with
	 */
	public constructor(context: ModuleCommand.Context, options: ModuleCommand.Options, module: T) {
		const config = module.getConfig();
		let commandOptions: CommandOptions;

		if (
			module.validateConfig(config) &&
			config.commands?.options &&
			config.commands.strategy !== undefined &&
			config.commands.strategy !== CommandOptionsStrategy.None
		) {
			if (config.commands.strategy === CommandOptionsStrategy.Overwrite) {
				commandOptions = { ...options, ...config.commands.options };
			} else {
				commandOptions = { ...config.commands.options, ...options };
			}
		} else {
			commandOptions = { ...options };
		}

		super(context, commandOptions);

		this.module = module;

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
	export type Options = Command.Options;
	export type JSON = Command.JSON;
	export type Context = Command.Context;
	export type RunInTypes = Command.RunInTypes;
	export type ChatInputCommandInteraction<Cached extends CacheType = CacheType> = Command.ChatInputCommandInteraction<Cached>;
	export type ContextMenuCommandInteraction<Cached extends CacheType = CacheType> = Command.ContextMenuCommandInteraction<Cached>;
	export type AutocompleteInteraction<Cached extends CacheType = CacheType> = Command.AutocompleteInteraction<Cached>;
	export type Registry = Command.Registry;
}
