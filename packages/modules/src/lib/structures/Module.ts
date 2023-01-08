import { Result, Piece } from '@sapphire/framework';
import { ModuleError } from '../errors/ModuleError';
import { join } from 'path';
import type { Awaitable } from '@sapphire/framework';
import type { Guild } from 'discord.js';
import type { ModuleConfig } from '../types/ModuleConfig';
import type { ChatInputModuleCommand, ModuleCommandInteractionUnion, ModuleCommandUnion } from './ModuleCommand';

export abstract class Module<T extends ModuleConfig = ModuleConfig, O extends Module.Options = Module.Options> extends Piece<O> {
	private _config: T | undefined;

	public readonly fullName: string;
	public readonly description: string | undefined;

	public constructor(context: Module.Context, options: Module.Options) {
		super(context, { ...options });
		this.fullName = options.fullName;
		this.description = options.description;
	}

	public isEnabled?(
		guild: Guild | null,
		interaction: ModuleCommandInteractionUnion,
		command: ModuleCommandUnion
	): Awaitable<boolean | Result<boolean, ModuleError>>;

	public setConfig(config: T): T {
		return (this._config = config);
	}

	public get config(): T | undefined {
		return this._config;
	}

	public validateConfig(config: T | undefined): config is T {
		return config !== undefined;
	}

	public ok(): Result.Ok<undefined>;
	public ok<R>(result: R): Result.Ok<R>;
	public ok<R = undefined>(result?: R) {
		return Result.ok(result);
	}

	public error(options: Omit<ModuleError.Options, 'module'> = {}): Result.Err<ModuleError> {
		return Result.err(new ModuleError({ module: this, ...options }));
	}

	public onLoad(): void {
		for (const [name, store] of this.container.stores.entries()) {
			if (name === 'modules') continue;
			const path = join(__dirname, name);
			store.registerPath(path);
		}
	}
}

export interface ModuleOptions extends Piece.Options {
	/**
	 * The name that will be displayed to users
	 */
	fullName: string;

	/**
	 * A description of the module
	 */
	description?: string;
}

export namespace Module {
	export type Options = ModuleOptions;
	export type Context = Piece.Context;
	export type Command = ChatInputModuleCommand;
}
