import type { ModuleCommand, ChatInputModuleCommand } from './ModuleCommand';
import { Piece } from '@sapphire/pieces';
import type { Awaitable } from '@sapphire/utilities';

export abstract class Module extends Piece {
	public readonly fullName: string;
	public readonly description: string;
	public readonly detailedDescription: string | undefined;

	public commands: ModuleCommand[] = [];
	public skipModuleCheck: boolean | undefined;
	public skipCommandCheck: boolean | undefined;

	public constructor(context: Module.Context, options: Module.Options) {
		super(context, { ...options });
		this.fullName = options.fullName;
		this.description = options.description;
		this.detailedDescription = options.detailedDescription;
		this.skipModuleCheck = options.skipModuleCheck;
		this.skipCommandCheck = options.skipCommandCheck;
	}

	public abstract isModuleEnabled(guildId: string): Awaitable<boolean>;

	public abstract isModuleCommandEnabled(command: ChatInputModuleCommand, guildId: string): Awaitable<boolean>;

	public addCommand(command: ModuleCommand) {
		this.commands.push(command);
	}
}

export interface ModuleOptions extends Piece.Options {
	name: string;
	fullName: string;
	description: string;
	detailedDescription?: string;
	skipModuleCheck?: boolean;
	skipCommandCheck?: boolean;
}

export namespace Module {
	export type Context = Piece.Context;
	export type Options = ModuleOptions;
}
