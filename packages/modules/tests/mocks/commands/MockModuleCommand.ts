import { ModuleCommand } from '@kbotdev/plugin-modules';
import type { MockModule } from '../modules/MockModule';
import type { Command } from '@sapphire/framework';

export class MockModuleCommand extends ModuleCommand<MockModule> {
	public constructor(context: ModuleCommand.Context, options: Command.Options) {
		super(context, {
			...options,
			module: 'MockModule',
			preconditions: ['ModuleEnabled'],
			deferOptions: {
				defer: true
			}
		});
	}

	public override registerApplicationCommands(registry: ModuleCommand.Registry) {
		registry.registerChatInputCommand((builder) => builder.setName('ping'), {
			guildIds: this.module.getConfig()?.commands?.guildIds
		});
	}

	public disabledMessage = (moduleName: string) => `[${moduleName}] Mock disabled message.`;

	public async chatInputRun(interaction: ModuleCommand.ChatInputCommandInteraction) {
		return interaction.reply('pong');
	}
}
