import { ModuleEnabledPrecondition } from './ModuleEnabled';
import { container } from '@sapphire/pieces';

export function loadPreconditions(): void {
	void container.stores.loadPiece({
		name: 'ModuleEnabled',
		piece: ModuleEnabledPrecondition,
		store: 'preconditions'
	});
}
