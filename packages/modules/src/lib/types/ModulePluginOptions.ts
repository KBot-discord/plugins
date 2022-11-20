export interface ModulePluginOptions {
	/**
	 * If the plugin should be enabled.
	 * @default true
	 */
	enabled?: boolean;

	/**
	 * If the default module error listeners should be enabled or not.
	 * @default true
	 */
	loadModuleErrorListeners?: boolean;
}
