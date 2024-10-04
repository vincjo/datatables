export { default as TableHandler } from './TableHandler.svelte'
export { check } from './Comparator'
import type { UUID } from 'crypto'
import type { Row, Internationalization } from '$lib/src/shared'
export {
    Datatable,
    Search,
    RowsPerPage,
    Th,
    ThSort,
    ThFilter,
    Pagination,
    RowCount,
    type Row,
    type Internationalization,
    type ColumnView,
    type TableHandlerInterface
} from '$lib/src/shared'

export type Field<Row> = keyof Row | ((row: Row) => unknown)

export type Filter<Row> = {
    callback: (row: Row) => unknown
    id: UUID,
    value?: unknown | Criterion[]
    check?: Check
    key?: string,
}

export type SearchType<Row> = {
    value: string,
    scope?: Field<Row>[],
    check?: Check
}

export type Sort<Row> = {
    callback?: (row: Row) => unknown
    id?: UUID
    direction?: 'asc' | 'desc'
    key?: string,
}

export type SortParams = {
    locales?: Intl.LocalesArgument,
    options?: Intl.CollatorOptions
}

export type Check = (entry: unknown, value: unknown) => boolean

export type TableParams = {
    rowsPerPage?: number,
    selectBy?: Field<Row>,
    highlight?: boolean,
    i18n?: Internationalization,
}

export type Criterion = {
    value: unknown,
    check: Check
}