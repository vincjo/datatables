import { page, navigating } from "$app/state";
import { goto } from "$app/navigation";
import type { State } from "$lib/server";

export class SSRFilters {
  Filters = $derived(page.url)

  constructor() {
    console.log("Filters", this.Filters);
  }

  get(name: string) {
    return this.Filters.searchParams.get(name);
  }

  update(filters: Record<string, string>) {
    const url = new URL(this.Filters);
    Object.entries(filters).forEach(([name, value]) => {
      if (!value) {
        url.searchParams.delete(name);
      }
      if (value !== "") url.searchParams.set(name, value);
      else url.searchParams.delete(name);
    });

    if (typeof window !== "undefined") {
      goto(url, { keepFocus: true });
    }
  }

  fromState(s: State) {
    const filters = s.filters ?? [];
    const sort = s.sort;
    const page = s.currentPage;
    const rowsPerPage = s.rowsPerPage;


    const url = new URL(this.Filters);
    for (const { field, value } of filters) {
      console.log("field", field, value);
      url.searchParams.set(field.toString(), value.toString());
    }
    if (sort?.field && sort?.direction) {
      console.log("sort", sort);
      url.searchParams.set("sort_id", sort.field?.toString());
      url.searchParams.set("sort_direction", sort.direction);
    }
    if (page) {
      url.searchParams.set("page", page.toString());
    }
    if (rowsPerPage) {
      url.searchParams.set("pageSize", rowsPerPage.toString());
    }

    if (typeof window !== "undefined") {
      goto(url, { keepFocus: true });
    }
  }

  clear(...params: string[]) {
    const url = new URL(this.Filters);
    params.forEach((p) => url.searchParams.delete(p));

    if (typeof window !== "undefined") {
      goto(url, { keepFocus: true });
    }
  }

  isFiltered(...params: string[]) {
    return (
      params.length > 0 && params.some((p) => this.Filters.searchParams.has(p))
    );
  }
}
