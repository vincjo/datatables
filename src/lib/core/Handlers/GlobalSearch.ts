import type Context from '../Context';
import type { Writable } from 'svelte/store';

export default class Search {
  private globalSearch: Writable<{ value: string | null; scope: string[] | null }>;

  constructor(context: Context) {
    this.globalSearch = context.globalSearch;
  }

  public set(value: string, scope: string[] = null): void {
    this.globalSearch.update((store) => {
      store = {
        value: value ?? '',
        scope: scope ?? null
      };
      return store;
    });
  }

  public remove(): void {
    this.globalSearch.set({ value: null, scope: null });
  }
}
