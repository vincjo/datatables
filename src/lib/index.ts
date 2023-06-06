// Reexport your entry components here
import DataHandler from './DataHandler'
import Datatable from './Datatable.svelte'
import Th from './Th.svelte'
import ThFilter from './ThFilter.svelte'
import Pagination from './Pagination.svelte'
import RowCount from './RowCount.svelte'
import RowsPerPage from './RowsPerPage.svelte'
import Search from './Search.svelte'
import { check } from './core/Comparator'

export { DataHandler, check, Datatable, Th, ThFilter, Pagination, RowCount, RowsPerPage, Search }

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

export type FilterBy<T> = keyof T | ((row: T) => T[keyof T])

export type Comparator<T> = (entry: T[keyof T], value: any) => boolean

export type Filter<T> = {
    filterBy: (row: T) => T[keyof T]
    identifier: string
    value?: string | number | boolean | symbol
    check?: Comparator<T>
}

export type OrderBy<T>  = keyof T | ((row: T) => T[keyof T])

export type Order<T> = {
    orderBy?: (row: T) => T[keyof T]
    identifier?: string
    direction?: 'asc' | 'desc'
}

export type Selectable<T> = T[keyof T] | T

export type RowCountState = { total: number, start: number, end: number }