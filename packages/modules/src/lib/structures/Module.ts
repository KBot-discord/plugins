import { ModuleError } from '../errors/ModuleError';
import { Piece, Result } from '@sapphire/framework';
import type { ModuleErrorOptions } from '../errors/ModuleError';
import type { Awaitable } from '@sapphire/framework';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ModuleEnabledPrecondition } from '../../preconditions/ModuleEnabled';
import type { IsEnabledContext, ModuleOptions } from '../types/ModuleTypes';

/**
 * The module plugin allows you to easily handle settings for batches of commands.
 *
 * @remarks One pattern might be to have `isEnabled` fetch guild-specific settings from a database, and then return true or false if the command should be run.
 *
 * @example
 * ```ts
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
 * ```
 */
export abstract class Module extends Piece {
	/**
	 * The name that will be displayed to users if this {@link Module} is disabled
	 */
	public readonly fullName: string;

	/**
	 * The description of this {@link Module}
	 */
	public readonly description: string | undefined;

	public constructor(context: Module.Context, options: Module.Options) {
		super(context, options);

		this.fullName = options.fullName;
		this.description = options.description;
	}

	/**
	 *
	 * @param context - The context that will be passed from {@link ModuleEnabledPrecondition}
	 * @returns If this {@link Module} is enabled
	 */
	public isEnabled?(context: IsEnabledContext): Awaitable<Result<boolean, ModuleError> | boolean>;

	/**
	 *
	 * @returns An instance of {@link Result.Ok}
	 */
	public ok(): Result.Ok<undefined>;

	/**
	 *
	 * @param result - The result you want to return
	 * @returns An instance of {@link Result.Ok}
	 */
	public ok<R>(result: R): Result.Ok<R>;
	public ok<R = undefined>(result?: R): Result.Ok<R | undefined> {
		return Result.ok(result);
	}

	/**
	 * Create a formatted {@link ModuleError}
	 * @param options - The options to pass to the error
	 * @returns An instance of {@link Result.Err}
	 */
	public error(options: Omit<ModuleErrorOptions, 'module'> = { moduleName: this.fullName }): Result.Err<ModuleError> {
		return Result.err(new ModuleError({ ...options, module: this }));
	}
}

export namespace Module {
	export type Options = ModuleOptions;
	export type Context = Piece.Context;
}
