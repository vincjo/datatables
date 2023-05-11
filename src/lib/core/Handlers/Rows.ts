import type Context from '../Context';
import { type Writable, type Readable, get } from 'svelte/store';

export type Sorted = {
  fn?: Function;
  identifier: string | null;
  direction: 'asc' | 'desc' | null;
  locales?: string;
  options?: Object;
};
export type SortingParams = { locales?: string; options?: Object };

export default class Rows {
  private rawRows: Writable<any[]>;
  private filteredRows: Readable<any[]>;
  private rows: Readable<any[]>;
  private triggerChange: Writable<number>;
  private sorted: Writable<Sorted>;
  private selected: Writable<any[]>;
  private selectScope: Writable<'currentPage' | 'all'>;
  private isAllSelected: Readable<boolean>;

  constructor(context: Context) {
    this.rawRows = context.rawRows;
    this.filteredRows = context.filteredRows;
    this.rows = context.rows;
    this.triggerChange = context.triggerChange;
    this.sorted = context.sorted;
    this.selected = context.selected;
    this.selectScope = context.selectScope;
    this.isAllSelected = context.isAllSelected;
  }

  public sort(orderBy: Function | string): void {
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

  public sortAsc(orderBy: Function | string): void {
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
        if (typeof a === 'string') return a.localeCompare(b);
        if (typeof a === 'number') return a - b;
        if (typeof a === 'object') return JSON.stringify(a).localeCompare(JSON.stringify(b));
        else return String(a).localeCompare(String(b));
      });
      return store;
    });
    this.triggerChange.update((store) => {
      return store + 1;
    });
  }

  public sortDesc(orderBy: Function | string): void {
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
        if (typeof b === 'string') return b.localeCompare(a);
        if (typeof b === 'number') return b - a;
        if (typeof b === 'object') return JSON.stringify(b).localeCompare(JSON.stringify(a));
        else return String(b).localeCompare(String(a));
      });

      return store;
    });
    this.triggerChange.update((store) => {
      return store + 1;
    });
  }

  public applySorting(
    params: { orderBy: Function | string; direction?: 'asc' | 'desc' | null } | null = null
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

  private parse(orderBy: Function | string): { fn: Function; identifier: string } {
    if (typeof orderBy === 'string') {
      return {
        fn: (row: any) => row[orderBy],
        identifier: orderBy.toString()
      };
    }
    return {
      fn: orderBy,
      identifier: orderBy.toString()
    };
  }

  public select(id: any) {
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
