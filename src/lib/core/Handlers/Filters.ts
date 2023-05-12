import type Context from '../Context';
import type { Writable } from 'svelte/store';

export type FilterBy<T> = keyof T | ((row: T) => T[keyof T]);

export default class Filters<T> {
	public filters: Writable<any[]>;

	constructor(context: Context<T>) {
		this.filters = context.filters;
	}

	public set(
		value: string | number,
		filterBy: FilterBy<T>,
		comparator: (args: any) => any = null
	): void {
		const parsed = this.parse(filterBy);
		this.filters.update((store) => {
			const filter = {
				filterBy: parsed.fn,
				value: value,
				identifier: parsed.identifier,
				compare: comparator
			};
			store = store.filter((item) => {
				return item.identifier !== parsed.identifier && item.value.length > 0;
			});
			store.push(filter);
			return store;
		});
	}

	public remove(): void {
		this.filters.set([]);
	}

	private parse(filterBy: FilterBy<T>) {
		if (typeof filterBy === 'string') {
			return {
				fn: (row) => row[filterBy],
				identifier: filterBy.toString()
			};
		}
		return {
			fn: filterBy,
			identifier: filterBy.toString()
		};
	}
}
