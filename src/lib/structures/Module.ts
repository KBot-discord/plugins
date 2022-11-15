import type { ModuleCommand } from './ModuleCommand';
import { Piece } from '@sapphire/pieces';
import type { Awaitable } from '@sapphire/utilities';
import type { ModuleSubcommand } from './ModuleSubcommand';

export abstract class Module extends Piece {
	public commands: ModuleCommand[] = [];

	public constructor(context: Piece.Context, options: ModuleOptions) {
		super(context, { ...options });
	}

	public abstract isEnabled(): Awaitable<boolean>;

	public addCommand(command: ModuleCommand | ModuleSubcommand) {
		this.commands.push(command);
	}
}

export interface ModuleOptions extends Piece.Options {
	name: string;
}
