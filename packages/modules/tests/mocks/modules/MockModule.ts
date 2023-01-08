import { Module, ModuleError } from '@kbotdev/plugin-modules';
import type { Piece, Result } from '@sapphire/framework';

export class MockModule extends Module {
	public constructor(context: Module.Context, options: Piece.Options) {
		super(context, {
			...options,
			fullName: 'Mock Module'
		});
	}

	public isEnabled(): Result<boolean, ModuleError> {
		return this.ok(true);
	}
}

declare module '@kbotdev/plugin-modules' {
	interface Modules {
		MockModule: never;
	}
}
