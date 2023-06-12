import { Module } from './Module';
import { Store } from '@sapphire/framework';

export class ModuleStore extends Store<Module> {
	public constructor() {
		super(Module, { name: 'modules' });
	}

	public override get(moduleName: keyof Modules): Module | undefined {
		return super.get(moduleName);
	}
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface Modules {}
