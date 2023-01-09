import { Result, Piece } from '@sapphire/framework';
import { ModuleError } from '../errors/ModuleError';
import type { Awaitable } from '@sapphire/framework';
import type { ModuleConfig } from '../types/ModuleConfig';
import type { ModuleEnabledPrecondition } from '../../preconditions/ModuleEnabled';
import type { IsEnabledContext, ModuleOptions } from '../types/ModuleTypes';
import type { ChatInputModuleCommand } from '../types/ModuleCommandTypes';

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
export abstract class Module<T extends ModuleConfig = ModuleConfig> extends Piece<ModuleOptions> {
	/**
	 * The {@link ModuleConfig} for this {@link Module}
	 */
	public config: T | undefined;

	/**
	 * The name that will be displayed to users if this {@link Module} is disabled
	 */
	public readonly fullName: string;

	/**
	 * The description of this {@link Module}
	 */
	public readonly description: string | undefined;

	/**
	 * Constructor for this instance of the {@link Module} class
	 */
	public constructor(context: Module.Context, options: Module.Options) {
		super(context, { ...options });
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
	 * Sets the {@link ModuleConfig} for this {@link Module}
	 * @param config
	 */
	public setConfig(config: T): T {
		return (this.config = config);
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
	public error(options: Omit<ModuleError.Options, 'module'> = {}): Result.Err<ModuleError> {
		return Result.err(new ModuleError({ module: this, ...options }));
	}
}

export namespace Module {
	export type Options = ModuleOptions;
	export type Context = Piece.Context;
	export type Command = ChatInputModuleCommand;
}
