export interface ModulePluginOptions {
	/**
	 * If the plugin should be enabled.
	 * @defaultValue true
	 */
	enabled?: boolean;

	/**
	 * If the default module error listeners should be enabled or not.
	 * @defaultValue true
	 */
	loadModuleErrorListeners?: boolean;
}
