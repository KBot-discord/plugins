import { UserError } from '@sapphire/framework';
import type { Module } from '../structures/Module';

export class ModuleError extends UserError {
	public readonly moduleName: string;
	public readonly module: Module | undefined;

	public constructor(options: ModuleError.Options) {
		super({ ...options, identifier: options.identifier ?? options.moduleName });
		this.moduleName = options.moduleName;
		this.module = options.module;
	}

	// eslint-disable-next-line @typescript-eslint/class-literal-property-style
	public override get name(): string {
		return 'ModuleError';
	}
}

export namespace ModuleError {
	export interface Options extends Omit<UserError.Options, 'identifier'> {
		moduleName: string;
		module?: Module;
		identifier?: string;
	}
}
