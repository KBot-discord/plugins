import { Store } from '@sapphire/framework';
import { Module } from './Module';

export class ModuleStore extends Store<Module> {
	public constructor() {
		super(Module, { name: 'modules' });
	}

	public get(moduleName: keyof Modules): Module | undefined {
		return super.get(moduleName);
	}
}

export interface Modules {}
