import type { ModuleCommand } from './ModuleCommand';
import { Piece } from '@sapphire/pieces';
import type { Awaitable } from '@sapphire/utilities';

export abstract class Module extends Piece {
	public readonly fullName: string;
	public readonly description: string;
	public readonly detailedDescription: string | undefined;

	public commands: ModuleCommand[] = [];

	public constructor(context: Piece.Context, options: ModuleOptions) {
		super(context, { ...options });
		this.fullName = options.fullName;
		this.description = options.description;
		this.detailedDescription = options.detailedDescription;
	}

	public abstract isEnabled(): Awaitable<boolean>;

	public addCommand(command: ModuleCommand) {
		this.commands.push(command);
	}
}

export interface ModuleOptions extends Piece.Options {
	name: string;
	fullName: string;
	description: string;
	detailedDescription?: string;
}
