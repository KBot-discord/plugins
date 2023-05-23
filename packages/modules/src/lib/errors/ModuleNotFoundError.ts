import { ModuleError } from './ModuleError';
import { ModuleIdentifiers } from './ModuleIdentifiers';

export class ModuleNotFoundError extends ModuleError {
	public constructor(options: ModuleNotFoundErrorOptions) {
		super({
			identifier: ModuleIdentifiers.ModuleNotFound,
			name: 'ModuleNotFoundError',
			moduleName: options.moduleName,
			message: `Failed to find a module with the name of ${options.moduleName}, please double check the module's name.`
		});
	}
}

export interface ModuleNotFoundErrorOptions {
	moduleName: string;
}
