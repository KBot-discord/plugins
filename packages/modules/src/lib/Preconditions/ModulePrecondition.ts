import { Precondition, Store } from '@sapphire/framework';
import type { Piece } from '@sapphire/pieces';
import { isNullish } from '@sapphire/utilities';
import type { Module } from '../structures/Module';

export class ModulePrecondition extends Precondition {
	public readonly moduleName: string;

	public constructor(context: Piece.Context, options: ModulePreconditionOptions) {
		super(context, options);
		this.moduleName = options.moduleName;
	}

	public chatInputRun() {
		return this.getModule().isEnabled() ? this.ok() : this.error();
	}

	private getModule() {
		const store = this.store as Store<Module>;
		const module = store.get(this.moduleName);
		if (isNullish(module)) throw Error('Module not found.');
		return module;
	}
}

export interface ModulePreconditionOptions extends Precondition.Options {
	moduleName: string;
}

export namespace ModulePrecondition {
	export type Options = ModulePreconditionOptions;
	export type Context = Precondition.Context;
	export type Result = Precondition.Result;
	export type AsyncResult = Precondition.AsyncResult;
}

declare module '@sapphire/framework' {
	interface Preconditions {
		EnabledModule: never;
	}
}
