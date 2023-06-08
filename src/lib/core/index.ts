<<<<<<< HEAD
export { default as DataHandler } from '../DataHandler'
export { default as Datatable } from '../Datatable.svelte'
export { default as Pagination } from '../Pagination.svelte'
export { default as RowCount } from '../RowCount.svelte'
export { default as RowsPerPage } from '../RowsPerPage.svelte'
export { default as Search } from '../Search.svelte'
export { default as Th } from '../Th.svelte'
export { default as ThFilter } from '../ThFilter.svelte'
export { check } from './Comparator'
=======
// Reexport your entry components here
import DataHandler from '../DataHandler'
import Datatable from '../Datatable.svelte'
import Th from '../Th.svelte'
import ThFilter from '../ThFilter.svelte'
import Pagination from '../Pagination.svelte'
import RowCount from '../RowCount.svelte'
import RowsPerPage from '../RowsPerPage.svelte'
import Search from '../Search.svelte'
import { check } from '../core/Comparator'

export { DataHandler, check, Datatable, Th, ThFilter, Pagination, RowCount, RowsPerPage, Search }
>>>>>>> upstream/master

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
<<<<<<< HEAD
=======

export type Row = { [key: string]: unknown  }

export type FilterBy<Row> = keyof Row | ((row: Row) => Row[keyof Row])

export type Comparator<Row> = (entry: Row[keyof Row], value: any) => boolean

export type Filter<Row> = {
    filterBy: (row: Row) => Row[keyof Row]
    identifier: string
    value?: string | number | boolean | symbol
    check?: Comparator<Row>
}

export type OrderBy<Row>  = keyof Row | ((row: Row) => Row[keyof Row])

export type Order<Row> = {
    orderBy?: (row: Row) => Row[keyof Row]
    identifier?: string
    direction?: 'asc' | 'desc'
}

export type Selectable<Row> = Row[keyof Row] | Row
>>>>>>> upstream/master
