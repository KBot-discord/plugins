<div align="center">

# KBot Modules Plugin

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://gitlab.com/kbot1/kbot-plugins/-/blob/main/LICENSE)

</div>

## Description

Register your commands with a module so they can easily be disabled or enabled through global or per-guild settings.

Note: the [subcommand plugin](https://github.com/sapphiredev/plugins/tree/main/packages/subcommands) is not supported yet since preconditions are not able to be applied to subcommands as of now.

## Installation
```bash
npm install @kbot/plugin-modules @sapphire/framework @sapphire/utilities discord.js
```

## Usage

Modules are loaded from the `modules` directory.

### Registering the plugin
```typescript
import '@kbot/plugin-modules/register'
```

### Creating a module

`isModuleEnabled` will be run every time a command associated with the module is run. For example, this allows you to have batches of commands under a certain database setting, or under a feature flag for testing.

```typescript
// modules/ExampleModule.ts
import { Module, type ModuleOptions } from '@kbot/plugin-modules';

export class ExampleModule extends Module {
	public constructor(context: Module.Context, options: Module.Options) {
		super(context, {
			...options,
			name: 'exampleModule',
			fullName: 'Example Module',
			description: 'An example module'
		});
	}

	// Have the module check be synchronous or asynchronous
	public isModuleEnabled(guildId: string): boolean {
		return true;
	}
	// or
	public async isModuleEnabled(guildId: string): Promise<boolean> {
		// Check a database
		const module = await database.getModule(guildId);

		if (!module.enabled) {
			return false;
		}
		return true;
	}

	// If the module is enabled, you can also check for specific commands
	public isModuleCommandEnabled(command: ChatInputModuleCommand, guildId: string): boolean {
		if (command.name === 'ping') {
			return true;
		}
		return false;
	}
	// or
	public async isModuleCommandEnabled(command: ChatInputModuleCommand, guildId: string): Promise<boolean> {
		const commandConfig = await database.getModuleCommand(guildId, command.name);

		if (!commandConfig.enabled) {
			return false;
		}
		return true;
	}
}

// Register the module name
declare module '@kbot/plugin-modules' {
	interface Modules {
		exampleModule: never;
	}
}
```

#### Creating a command for the module
All module commands are Guild-only by default, so no need to add that precondition.
```typescript
import { ModuleCommand } from '@kbot/plugin-modules';
import type { ChatInputCommand } from '@sapphire/framework';

export class ExampleCommand extends ModuleCommand {
		public constructor(context: ModuleCommand.Context, options: ModuleCommand.Options) {
		super(context, {
			...options,
			module: 'exampleModule'
		});
	}

	public async chatInputRun(interaction: ChatInputCommand.Interaction) {
		// Do stuff
	}
}
```
