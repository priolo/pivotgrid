
import { describe, it, expect } from 'vitest';
import { buildTree } from './utils';

describe('buildTree', () => {
	it('returns empty array if struct is empty', () => {
		const data = [{ foo: 'bar' }];
		const result = buildTree(data, []);
		expect(result).toEqual([]);
	});

	it('builds a single-level tree', () => {
		const data = [
			{ category: 'A', value: 1 },
			{ category: 'A', value: 2 },
			{ category: 'B', value: 3 }
		];
		const struct = ['category'];
		const result = buildTree(data, struct);
		expect(result).toHaveLength(2);
		expect(result[0].value).toBe('A');
		expect(result[1].value).toBe('B');
	});

	it('builds a multi-level tree', () => {
		const data = [
			{ level1: 'X', level2: 'Y', value: 1 },
			{ level1: 'X', level2: 'Z', value: 2 },
			{ level1: 'W', level2: 'Y', value: 3 },
		];
		const struct = ['level1', 'level2'];
		const result = buildTree(data, struct);
		expect(result).toHaveLength(2);
		expect(result[0].value).toBe('X');
		expect(result[0].children).toHaveLength(2);
		expect(result[1].value).toBe('W');
		expect(result[1].children).toHaveLength(1);
		expect(result[1].children?.[0].indexes).toMatchObject([2]);
	});

	it('test complex object', () => {
		const data = [
			{ propA: "a1", propB: "b1", propC: "c1", date: "14-08-2015", value: 5 },
			{ propA: "a1", propB: "b1", propC: "c2", date: "20-08-2015", value: 3 },
			{ propA: "a1", propB: "b2", propC: "c3", date: "15-08-2015", value: 7 },
			{ propA: "a1", propB: "b3", propC: "c4", date: "09-08-2015", value: 5 },
			{ propA: "a1", propB: "b3", propC: "c5", date: "10-08-2015", value: 2 },
			{ propA: "a1", propB: "b3", propC: "c6", date: "11-08-2015", value: 5 },
			{ propA: "a2", propB: "b4", propC: "c7", date: "11-08-2015", value: 7 },
			{ propA: "a2", propB: "b4", propC: "c8", date: "20-08-2015", value: 5 },
			{ propA: "a2", propB: "b5", propC: "c9", date: "14-08-2015", value: 11 },
		];
		const struct = ["propA", "propB"];
		const result = buildTree(data, struct);
		expect(result).toMatchObject([
			{
				value: "a1",
				collapsed: true,
				indexes: [0, 1, 2, 3, 4, 5],
				children: [
					{
						value: "b1",
						collapsed: true,
						indexes: [0, 1],
						children: null,
					},
					{
						value: "b2",
						collapsed: true,
						indexes: [2],
						children: null,
					},
					{
						value: "b3",
						collapsed: true,
						indexes: [3, 4, 5],
						children: null,
					},
				],
			},
			{
				value: "a2",
				collapsed: true,
				indexes: [6, 7, 8],
				children: [
					{
						value: "b4",
						collapsed: true,
						indexes: [6, 7],
						children: null,
					},
					{
						value: "b5",
						collapsed: true,
						indexes: [8],
						children: null,
					},
				],
			},
		])

	});
});