import type Context from '../Context';
import type { Writable } from 'svelte/store';

export default class Filters {
  public filters: Writable<any[]>;

  constructor(context: Context) {
    this.filters = context.filters;
  }

  public set(
    value: string | number,
    filterBy: Function | string,
    comparator: Function = null
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

  private parse(filterBy: Function | string): { fn: Function; identifier: string } {
    if (typeof filterBy === 'string') {
      return {
        fn: (row: Object) => row[filterBy],
        identifier: filterBy.toString()
      };
    }
    return {
      fn: filterBy,
      identifier: filterBy.toString()
    };
  }
}
