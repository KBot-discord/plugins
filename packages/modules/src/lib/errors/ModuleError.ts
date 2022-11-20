import { UserError } from '@sapphire/framework';
import type { Module } from '../structures/Module';

export class ModuleError extends UserError {
	public readonly module: Module;

	public constructor(options: ModuleError.Options) {
		super({ ...options, identifier: options.identifier ?? options.module.name });
		this.module = options.module;
	}

	// eslint-disable-next-line @typescript-eslint/class-literal-property-style
	public override get name(): string {
		return 'ModuleError';
	}
}

export namespace ModuleError {
	export interface Options extends Omit<UserError.Options, 'identifier'> {
		module: Module;
		identifier?: string;
	}
}
