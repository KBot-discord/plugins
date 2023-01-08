import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		setupFiles: ['./tests/vitest.setup.ts'],
		coverage: {
			reporter: ['text', 'lcov', 'clover']
		}
	}
});
