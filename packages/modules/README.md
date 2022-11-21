<div align="center">

# KBot Modules Plugin

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://gitlab.com/kbot1/kbot-plugins/-/blob/main/LICENSE)

[![npm](https://img.shields.io/npm/v/@kbotdev/plugin-modules?color=crimson&logo=npm&label=@kbotdev/plugin-modules)](https://www.npmjs.com/package/@kbotdev/plugin-modules)

</div>

## Description

A common design of Discord bots is to separate functionality into distinct domains (such as moderation, server management, etc.). Every command that
is registered to a module will have access to that module, and by extension any properties/methods exposed in that module.

## Installation

```bash
npm install @kbotdev/plugin-modules @sapphire/framework discord.js
```

## Examples
Work in progress

## Usage

Modules are loaded from the `modules` directory.

### Registering the plugin

```typescript
import '@kbotdev/plugin-modules/register';
```

### Creating a module

```typescript
// modules/ExampleModule.ts
import { Module, type ModuleOptions } from '@kbotdev/plugin-modules';

export class ExampleModule extends Module {
	public constructor(context: Module.Context, options: Module.Options) {
		super(context, {
			...options,
			name: 'exampleModule',
			fullName: 'Example Module',
			description: 'An example module'
		});
	}
}

// Register the module name
declare module '@kbotdev/plugin-modules' {
	interface Modules {
		exampleModule: never;
	}
}
```

### Creating a command for the module

```typescript
import { ModuleCommand } from '@kbotdev/plugin-modules';
import type { ChatInputCommand } from '@sapphire/framework';

export class ExampleCommand extends ModuleCommand<ExampleModule> {
	public constructor(context: ModuleCommand.Context, options: ModuleCommand.Options) {
		super(context, {
			...options,
			module: 'exampleModule'
		});
	}

	public async chatInputRun(interaction: ChatInputCommand.Interaction) {
            // Access the module with
            const { module } = this;
	}
}
```
