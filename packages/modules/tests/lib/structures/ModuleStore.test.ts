import { describe, test, expect } from 'vitest';
import { Module } from '../../../dist';
import { mockClient } from '../../mocks/Client';

describe('ModuleStore', () => {
	test('get module from store', () => {
		const store = mockClient.stores.get('modules');

		const module = store.get('MockModule');

		expect(module instanceof Module).toBe(true);
	});
});
