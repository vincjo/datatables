import type Context from '../Context';
import { type Writable, type Readable, get } from 'svelte/store';

export type Sorted<T> = {
	fn?: (row: T) => T[keyof T];
	identifier: string | null;
	direction: 'asc' | 'desc' | null;
	locales?: string;
	options?: Record<string, unknown>;
};
export type SortingParams = { locales?: string; options?: Record<string, unknown> };

export type OrderBy<T> = keyof T | ((row: T) => T[keyof T]);

export default class Rows<T> {
	private rawRows: Writable<T[]>;
	private filteredRows: Readable<T[]>;
	private rows: Readable<T[]>;
	private triggerChange: Writable<number>;
	private sorted: Writable<Sorted<T>>;
	private selected: Writable<T[]>;
	private selectScope: Writable<'currentPage' | 'all'>;
	private isAllSelected: Readable<boolean>;

	constructor(context: Context<T>) {
		this.rawRows = context.rawRows;
		this.filteredRows = context.filteredRows;
		this.rows = context.rows;
		this.triggerChange = context.triggerChange;
		this.sorted = context.sorted;
		this.selected = context.selected;
		this.selectScope = context.selectScope;
		this.isAllSelected = context.isAllSelected;
	}

	public sort(orderBy: OrderBy<T>): void {
		if (!orderBy) return;
		const sorted = get(this.sorted);
		const parsed = this.parse(orderBy);

		if (sorted.identifier !== parsed.identifier) {
			this.sorted.update((store) => (store.direction = null));
		}
		if (sorted.direction === null || sorted.direction === 'desc') {
			this.sortAsc(orderBy);
		} else if (sorted.direction === 'asc') {
			this.sortDesc(orderBy);
		}
	}

	public sortAsc(orderBy: OrderBy<T>): void {
		if (!orderBy) return;
		const parsed = this.parse(orderBy);
		this.sorted.set({ identifier: parsed.identifier, direction: 'asc', fn: parsed.fn });
		this.rawRows.update((store) => {
			store.sort((x, y) => {
				const [a, b] = [parsed.fn(x), parsed.fn(y)];
				if (a === b) return 0;
				if (a === null) return 1;
				if (b === null) return -1;
				if (typeof a === 'boolean') return a === false ? 1 : -1;
				if (typeof a === 'string') return a.localeCompare(b as string);
				if (typeof a === 'number') return a - (b as number);
				if (typeof a === 'object')
					return JSON.stringify(a).localeCompare(JSON.stringify(b));
				else return String(a).localeCompare(String(b));
			});
			return store;
		});
		this.triggerChange.update((store) => {
			return store + 1;
		});
	}

	public sortDesc(orderBy: ((row: T) => T[keyof T]) | keyof T): void {
		if (!orderBy) return;
		const parsed = this.parse(orderBy);
		this.sorted.set({ identifier: parsed.identifier, direction: 'desc', fn: parsed.fn });
		this.rawRows.update((store) => {
			store.sort((x, y) => {
				const [a, b] = [parsed.fn(x), parsed.fn(y)];
				if (a === b) return 0;
				if (a === null) return 1;
				if (b === null) return -1;
				if (typeof b === 'boolean') return b === false ? 1 : -1;
				if (typeof b === 'string') return b.localeCompare(a as string);
				if (typeof b === 'number') return b - (a as number);
				if (typeof b === 'object')
					return JSON.stringify(b).localeCompare(JSON.stringify(a));
				else return String(b).localeCompare(String(a));
			});

			return store;
		});
		this.triggerChange.update((store) => {
			return store + 1;
		});
	}

	public applySorting(
		params: {
			orderBy: OrderBy<T>;
			direction?: 'asc' | 'desc' | null;
		} | null = null
	) {
		if (params) {
			switch (params.direction) {
				case 'asc':
					return this.sortAsc(params.orderBy);
				case 'desc':
					return this.sortDesc(params.orderBy);
				default:
					return this.sort(params.orderBy);
			}
		}
		const sorted = get(this.sorted);
		if (sorted.identifier) {
			return this.applySorting({
				orderBy: sorted.fn,
				direction: sorted.direction
			});
		}
		return;
	}

	private parse(orderBy: OrderBy<T>) {
		if (
			typeof orderBy === 'string' ||
			typeof orderBy === 'number' ||
			typeof orderBy === 'symbol'
		) {
			return {
				fn: (row: T) => row[orderBy],
				identifier: orderBy.toString()
			};
		} else if (typeof orderBy === 'function') {
			return {
				fn: orderBy,
				identifier: orderBy.toString()
			};
		}
		throw new Error('Invalid orderBy argument');
	}

	public select(id: T) {
		const selected = get(this.selected);
		if (selected.includes(id)) {
			this.selected.set(selected.filter((item) => item !== id));
		} else {
			this.selected.set([id, ...selected]);
		}
	}

	public selectAll(accessor: string = null) {
		const isAllSelected = get(this.isAllSelected);
		const selectScope = get(this.selectScope);
		if (isAllSelected) {
			return this.unselectAll();
		}
		const rows = selectScope === 'currentPage' ? get(this.rows) : get(this.filteredRows);

		if (accessor) {
			this.selected.set(
				rows.map((row) => {
					return row[accessor];
				})
			);
		} else {
			this.selected.set(rows);
		}
	}

	public unselectAll() {
		this.selected.set([]);
	}
}
