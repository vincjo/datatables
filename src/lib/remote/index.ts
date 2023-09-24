// Reexport your entry components here
import DataHandler      from './DataHandler'
import Datatable        from './Datatable.svelte'
import Search           from './Search.svelte'
import RowsPerPage      from './RowsPerPage.svelte'
import Th               from './Th.svelte'
import ThFilter         from './ThFilter.svelte'
import RowCount         from './RowCount.svelte'
import Pagination       from './Pagination.svelte'

export { DataHandler, Datatable, Search, RowsPerPage, Th, ThFilter, RowCount, Pagination }

export type Internationalization = {
    search  ?: string
    show    ?: string
    entries ?: string
    filter  ?: string
    rowCount?: string
    noRows  ?: string
    previous?: string
    next    ?: string
}

export type Row = { [key: string]: unknown  }


export type Filter<Row> = {
    filterBy: keyof Row
    value?: string | number | boolean
}

export type Sort<Row> = {
    orderBy?: keyof Row
    direction?: 'asc' | 'desc'
}

export type State = {
    currentPage: string,
    rowsPerPage: string,
    offset: string,
    search: string | undefined,
    sort: Sort<Row> | undefined
    filters: Filter<Row>[] | undefined
    setTotalRows: (value: number) => void


    /**
     * @deprecated use 'sort' instead
     */
    sorted: Sort<Row> | undefined,
    /**
     * @deprecated use 'currentPage' instead
     */
    pageNumber: number,
}


/**
 * @deprecated use (Row[keyof Row] | Row) instead
 * 
 * import type { Row } from '@vincjo/datatables/remote'
 */
export type Selectable<Row> = Row[keyof Row] | Row

/**
 * @deprecated use type Sort<Row> instead
 * 
 * import type { Sort } from '@vincjo/datatables/remote'
 */
export type Order<Row> = Sort<Row>