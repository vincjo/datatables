// Reexport your entry components here
import DataHandler  from './remote/DataHandler'
import Datatable    from './remote/Datatable.svelte'
import Th           from './remote/Th.svelte'
import ThFilter     from './remote/ThFilter.svelte'
import Td           from './remote/Td.svelte'
import Pagination   from './remote/Pagination.svelte'
import RowCount     from './remote/RowCount.svelte'
import RowsPerPage  from './remote/RowsPerPage.svelte'
import Search       from './remote/Search.svelte'
import { check }    from './local/Comparator'
import type { Internationalization, Row, Filter, Sort, Selectable, Order } from './remote'
import type {Field, Comparator, FilterBy, OrderBy} from './local'

export { DataHandler, check, Datatable, Th, ThFilter, Td, Pagination, RowCount, RowsPerPage, Search }

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