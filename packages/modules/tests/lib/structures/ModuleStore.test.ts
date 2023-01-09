import { describe, test, expect } from 'vitest';
import { Module } from '../../../dist';
import { mockClient } from '../../mocks/mockClient';

describe('ModuleStore', () => {
	test('GIVEN module in store RETURN the module', () => {
		const store = mockClient.stores.get('modules');

		const module = store.get('MockModule');

		expect(module instanceof Module).toBe(true);
	});

	test('GIVEN module not in store RETURN undefined', () => {
		const store = mockClient.stores.get('modules');

		// @ts-expect-error NonExistentModule is not set in the Modules interface
		const module = store.get('NonExistentModule');

		expect(module).toBe(undefined);
	});
});
