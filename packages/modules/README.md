<div align="center">

# KBot Modules Plugin

**Plugin for [@sapphire/framework](https://github.com/sapphiredev/framework) to group commands and features into modules.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/KBot-discord/plugins/blob/main/LICENSE)

[![npm](https://img.shields.io/npm/v/@kbotdev/plugin-modules?color=crimson&logo=npm&label=@kbotdev/plugin-modules)](https://www.npmjs.com/package/@kbotdev/plugin-modules)
[![npm](https://img.shields.io/npm/dt/@kbotdev/plugin-modules?color=crimson&logo=npm)](https://www.npmjs.com/package/@kbotdev/plugin-modules)

</div>

## Description

This plugin allows developers to seperate commands and features into distinct modules, as well as allow them to be dynamically enabled and disabled.

## Installation

```bash
npm install @kbotdev/plugin-modules @sapphire/framework discord.js
```

## Subcommand plugin compatibility

If you are already using the [Subcommand plugin](https://github.com/sapphiredev/plugins/tree/main/packages/subcommands), make sure you do **NOT** manually register the subcommand plugin. This plugin already registers it due to the dependency.

## Usage

Modules are loaded from the `modules` directory.

### Registering the plugin

```typescript
import '@kbotdev/plugin-modules/register';
```

### Creating a module

```typescript
// modules/ExampleModule.ts
import { Module, type IsEnabledContext, type ModuleError } from '@kbotdev/plugin-modules';
import type { Piece, Result } from '@sapphire/framework';

export class ExampleModule extends Module {
	public constructor(context: Module.LoaderContext, options: Piece.Options) {
		super(context, {
			...options,
			// The name of the module that a user would see
			fullName: 'Example Module',
			description: 'An example module.'
		});
	}

	public isEnabled(context: IsEnabledContext): boolean {
		return true;
	}

	// Or async
	public async isEnabled(context: IsEnabledContext): Promise<boolean> {
		try {
			const data = await getGuildSettings(context.guild?.id);
			return data.enabled;
		} catch {
			return false;
		}
	}

	// Or using Result from @sapphire/framework
	public isEnabled(context: IsEnabledContext): Result<boolean, ModuleError> {
		return this.ok(true);
	}
}

// Register the module name as what you put for the class
declare module '@kbotdev/plugin-modules' {
	interface Modules {
		ExampleModule: never;
	}
}
```

### Creating a command for the module

```typescript
// commands/ExampleCommand.ts
import { ModuleCommand } from '@kbotdev/plugin-modules';
import type { Command } from '@sapphire/framework';
import type { ExampleModule } from '../modules/ExampleModule';

export class ExampleCommand extends ModuleCommand<ExampleModule> {
	public constructor(context: ModuleCommand.LoaderContext, options: Command.Options) {
		super(context, {
			...options,

			// Using the same name registered earlier
			module: 'ExampleModule',
			description: 'An awesome description.',

			// A precondition that calls the 'isEnabled' function on ExampleModule
			preconditions: ['ModuleEnabled']
		});
	}

	public async chatInputRun(interaction: ModuleCommand.ChatInputCommandInteraction) {
		// Access the module with
		const { module } = this;
		return interaction.reply(module.fullName);
	}
}
```
