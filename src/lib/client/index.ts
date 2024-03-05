// Reexport your entry components here
import DataHandler  from './DataHandler'
import Datatable    from './Datatable.svelte'
import Header       from './Header.svelte'
import Footer       from './Footer.svelte'
import Th           from './Th.svelte'
import ThFilter     from './ThFilter.svelte'
import Pagination   from './Pagination.svelte'
import RowCount     from './RowCount.svelte'
import RowsPerPage  from './RowsPerPage.svelte'
import Search       from './Search.svelte'
import { check }    from './Comparator'

export { DataHandler, check, Datatable, Header, Footer, Th, ThFilter, Pagination, RowCount, RowsPerPage, Search }

export type { default as EventsHandler } from './handlers/EventsHandler'

export type Internationalization = {
    search?: string
    show?: string
    entries?: string
    filter?: string
    rowCount?: string
    noRows?: string
    previous?: string
    next?: string
}

export type Row = { [key: string]: any  }
export type Field<Row> = keyof Row | ((row: Row) => Row[keyof Row])

export type Filter<Row> = {
    callback: (row: Row) => Row[keyof Row]
    identifier: string
    value?: string | number | boolean | symbol | Criterion[]
    comparator?: Comparator<Row>
    key?: string
}

export type Sort<Row> = {
    callback?: (row: Row) => Row[keyof Row]
    identifier?: string
    direction?: 'asc' | 'desc'
    key?: string
}

export type Comparator<Row> = (entry: Row[keyof Row], value: any) => boolean

export type Criterion = { value: string | number | [min: number, max: number], comparator: Comparator<Row> }




/**
 * @deprecated use (Row[keyof Row] | Row) instead
 * 
 * import type { Row } from '@vincjo/datatables'
 */
export type Selectable<Row> = Row[keyof Row] | Row

/**
 * @deprecated use type Field<Row> instead
 * 
 * import type { Field } from '@vincjo/datatables'
 */
export type FilterBy<Row> = Field<Row>

/**
 * @deprecated use type Field<Row> instead
 * 
 * import type { Field } from '@vincjo/datatables'
 */
export type OrderBy<Row> = Field<Row>

/**
 * @deprecated use type Sort<Row> instead
 * 
 * import type { Sort } from '@vincjo/datatables'
 */
export type Order<Row> = Sort<Row>