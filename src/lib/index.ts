// Reexport your entry components here
import DataHandler  from './client/DataHandler'
import Datatable    from './client/Datatable.svelte'
import Th           from './client/Th.svelte'
import ThFilter     from './client/ThFilter.svelte'
import Pagination   from './client/Pagination.svelte'
import RowCount     from './client/RowCount.svelte'
import RowsPerPage  from './client/RowsPerPage.svelte'
import Search       from './client/Search.svelte'
import { check }    from './client/Comparator'
import type { Internationalization, Row, Field, Comparator, Filter, Sort, Selectable, Order, FilterBy, OrderBy  } from './client'

export { DataHandler, check, Datatable, Th, ThFilter, Pagination, RowCount, RowsPerPage, Search }

export type  {
    Internationalization,
    Row,
    Field,
    Comparator,
    Filter,
    Sort,

    // deprecated
    Selectable,
    Order,
    OrderBy,
    FilterBy,
}