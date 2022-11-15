import { Store } from '@sapphire/pieces';
import { Module } from './Module';
import type { Modules } from '../types/Module';

export class ModuleStore extends Store<Module> {
	public constructor() {
		super(Module, { name: 'modules' });
	}

	public get(moduleName: keyof Modules) {
		return super.get(moduleName);
	}
}
