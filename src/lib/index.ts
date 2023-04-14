// Reexport your entry components here
import DataHandler from './DataHandler'
import Comparator from './Comparator'
import Datatable from './Datatable.svelte'
import Th from './Th.svelte'
import ThFilter from './ThFilter.svelte'
import Pagination from './Pagination.svelte'
import RowCount from './RowCount.svelte'
import RowsPerPage from './RowsPerPage.svelte'
import Search from './Search.svelte'


export {
    DataHandler, Comparator,
    Datatable, Th, ThFilter, Pagination, RowCount, RowsPerPage, Search
}

export type Internationalization = {
    search?: string,
    show?: string, 
    entries?: string,
    filter?: string,
    rowCount?: string,
    noRows?: string, 
    previous?: string, 
    next?: string 
}

export const isEqualTo = (entry, value) => {
    return entry === value
}

export const startsWith = (entry, value) => {
    return entry.startsWith(value)
}