import { ModuleIdentifiers } from './ModuleIdentifiers';
import { UserError } from '@sapphire/framework';
import type { Module } from '../structures/Module';

export class ModuleError extends UserError {
	public readonly moduleName: string;
	public readonly module: Module | undefined;

	private readonly _name: string;

	public constructor(options: ModuleErrorOptions) {
		super({ ...options, identifier: options.identifier ?? ModuleIdentifiers.ModuleError });

		this.moduleName = options.moduleName;
		this._name = options.name ?? 'ModuleError';
		this.module = options.module;
	}

	public override get name(): string {
		return this._name;
	}
}

export interface ModuleErrorOptions extends Omit<UserError.Options, 'identifier'> {
	moduleName: string;
	name?: string;
	module?: Module;
	identifier?: string;
}
