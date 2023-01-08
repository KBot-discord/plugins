import { ModuleCommand } from '@kbotdev/plugin-modules';
import type { MockModule } from '../modules/MockModule';

export class MockModuleCommand extends ModuleCommand<MockModule> {
	public constructor(context: ModuleCommand.Context, options: ModuleCommand.Options) {
		super(context, {
			...options,
			module: 'MockModule',
			preconditions: ['ModuleEnabled']
		});
	}

	public override registerApplicationCommands(registry: ModuleCommand.Registry) {
		registry.registerChatInputCommand((builder) => builder.setName('ping'));
	}

	public async chatInputRun(interaction: ModuleCommand.ChatInputCommandInteraction) {
		return interaction.reply('pong');
	}
}
