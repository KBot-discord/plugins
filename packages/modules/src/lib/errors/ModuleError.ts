import { UserError } from '@sapphire/framework';
import type { Module } from '../structures/Module';

export class ModuleError extends UserError {
	private readonly _name = 'ModuleError';

	public readonly moduleName: string;
	public readonly module: Module | undefined;

	public constructor(options: ModuleError.Options) {
		super({ ...options, identifier: options.identifier ?? options.moduleName });
		this.moduleName = options.moduleName;
		this.module = options.module;
	}

	public get name() {
		return this._name;
	}
}

export namespace ModuleError {
	export interface Options extends Omit<UserError.Options, 'identifier'> {
		moduleName: string;
		module?: Module;
		identifier?: string;
	}
}
