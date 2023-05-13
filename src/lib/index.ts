// Reexport your entry components here
import DataHandler from './DataHandler';
import Datatable from './Datatable.svelte';
import Th from './Th.svelte';
import ThFilter from './ThFilter.svelte';
import Pagination from './Pagination.svelte';
import RowCount from './RowCount.svelte';
import RowsPerPage from './RowsPerPage.svelte';
import Search from './Search.svelte';
import { check } from './core/Comparator';

export { DataHandler, check, Datatable, Th, ThFilter, Pagination, RowCount, RowsPerPage, Search };

export type Internationalization = {
  search?: string;
  show?: string;
  entries?: string;
  filter?: string;
  rowCount?: string;
  noRows?: string;
  previous?: string;
  next?: string;
};
