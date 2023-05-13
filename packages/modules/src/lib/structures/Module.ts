import { Result } from '@sapphire/framework';
import { ModuleError } from '../errors/ModuleError';
import type { Awaitable } from '@sapphire/framework';
import type { ModuleConfig } from '../types/ModuleConfig';
import type { ModuleEnabledPrecondition } from '../../preconditions/ModuleEnabled';
import type { IsEnabledContext, ModuleOptions } from '../types/ModuleTypes';
import type { ChatInputModuleCommand } from '../types/ModuleCommandTypes';
import type { ModuleCommand } from './ModuleCommand';
import { Collection } from 'discord.js';

/**
 * The module plugin allows you to easily handle settings for batches of commands.
 *
 * @remark One pattern might be to have `isEnabled` fetch guild-specific settings from a database, and then return true or false if the command should be run.
 *
 * @example
 * export class ExampleModule extends Module {
 * 		public constructor(context: Module.Context, options: Piece.Options) {
 * 			super(context, {
 *          	...options,
 *             	fullName: 'Example Module',
 *             	description: 'An example module.'
 *         	});
 *     	}
 *
 *     	public isEnabled(context: IsEnabledContext): boolean {
 *         	return true;
 *     	}
 * }
 *
 */
export abstract class Module<T extends ModuleConfig = ModuleConfig> {
	/**
	 * The {@link ModuleConfig} for this {@link Module}
	 */
	protected config: T | undefined;

	/**
	 * The name that will be displayed to users if this {@link Module} is disabled
	 */
	public readonly fullName: string;

	/**
	 * The description of this {@link Module}
	 */
	public readonly description: string | undefined;

	/**
	 * The {@link ModuleCommand}s associated with this module
	 */
	public readonly commands = new Collection<string, ModuleCommand>();

	public constructor(options: ModuleOptions) {
		this.fullName = options.fullName;
		this.description = options.description;
	}

	/**
	 *
	 * @param context The context that will be passed from {@link ModuleEnabledPrecondition}
	 * @returns If this {@link Module} is enabled
	 */
	public isEnabled?(context: IsEnabledContext): Awaitable<boolean | Result<boolean, ModuleError>>;

	/**
	 * Gets the {@link ModuleConfig} for this {@link Module}
	 */
	public getConfig(): T | undefined {
		return this.config;
	}

	/**
	 * Sets the {@link ModuleConfig} for this {@link Module}
	 * @param config
	 */
	public setConfig(config: T): void {
		this.config = config;
	}

	/**
	 * Validates if the {@link ModuleConfig} is undefined or not
	 * @param config The {@link ModuleConfig} to validate
	 * @return If the {@link ModuleConfig} is valid
	 */
	public validateConfig(config: T | undefined): config is T {
		return config !== undefined;
	}

	/**
	 *
	 * @returns An instance of {@link Result.Ok}
	 */
	public ok(): Result.Ok<undefined>;

	/**
	 *
	 * @param result The result you want to return
	 * @returns An instance of {@link Result.Ok}
	 */
	public ok<R>(result: R): Result.Ok<R>;
	public ok<R = undefined>(result?: R) {
		return Result.ok(result);
	}

	/**
	 * Create a formatted {@link ModuleError}
	 * @param options
	 * @returns An instance of {@link Result.Err}
	 */
	public error(options: Omit<ModuleError.Options, 'module'> = { moduleName: this.fullName }): Result.Err<ModuleError> {
		return Result.err(new ModuleError({ ...options, module: this }));
	}
}

export namespace Module {
	export type Options = ModuleOptions;
	export type Command = ChatInputModuleCommand;
}
