import type Context from '../Context';
import { type Writable, type Readable, get } from 'svelte/store';

export default class Pages {
  public pageNumber: Writable<number>;
  public rowCount: Readable<{ total: number; start: number; end: number }>;
  public rowsPerPage: Writable<number | null>;
  public triggerChange: Writable<number>;
  public pages: Readable<any[]>;

  constructor(context: Context) {
    this.pageNumber = context.pageNumber;
    this.rowCount = context.rowCount;
    this.rowsPerPage = context.rowsPerPage;
    this.triggerChange = context.triggerChange;
    this.pages = context.pages;
  }

  public get(): Readable<any[]> {
    return this.pages;
  }

  public goTo(number: number): void {
    this.pageNumber.update((store) => {
      const $rowsPerPage = this.getRowsPerPage();
      if ($rowsPerPage) {
        const total = get(this.rowCount).total;
        if (number >= 1 && number <= Math.ceil(total / $rowsPerPage)) {
          store = number;
          this.triggerChange.update((store) => {
            return store + 1;
          });
        }
      }
      return store;
    });
  }

  public previous(): void {
    const number = get(this.pageNumber) - 1;
    this.goTo(number);
  }

  public next(): void {
    const number = get(this.pageNumber) + 1;
    this.goTo(number);
  }

  private getRowsPerPage(): number | null {
    let value = null;
    this.rowsPerPage.subscribe((store) => (value = store));
    return value;
  }
}
