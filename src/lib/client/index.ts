import TableHandler from './TableHandler.svelte'
import Th           from './Th.svelte'
import ThFilter     from './ThFilter.svelte'
import Search       from './Search.svelte'
import { check }    from './Comparator'

export { TableHandler, Th, ThFilter, Search, check }

export { Datatable, Header, Footer, Pagination, RowCount, RowsPerPage } from '$lib/shared'

export type { default as EventsHandler } from './handlers/EventsHandler'

/**
 * @description Used to define the text displayed in showcase components.
 */
export type Internationalization = {
    search  ?: string,
    show    ?: string,
    entries ?: string,
    filter  ?: string,
    rowCount?: string,
    noRows  ?: string,
    previous?: string,
    next    ?: string
}

export type Row = { [key: string]: any  }
export type Field<Row> = keyof Row | ((row: Row) => Row[keyof Row])

export type Filter<Row> = {
    callback: (row: Row) => Row[keyof Row]
    identifier: string
    value?: string | number | boolean | symbol | Criterion[]
    check?: Check<Row>
    key?: string
}

export type Sorting<Row> = {
    callback?: (row: Row) => Row[keyof Row]
    identifier?: string
    direction?: 'asc' | 'desc'
    key?: string
}

export type Check<Row> = (entry: Row[keyof Row], value: any) => boolean

export type Criterion = { 
    value: string | number | number[], 
    check: Check<Row> 
}

