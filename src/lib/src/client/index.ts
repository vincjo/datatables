export { default as TableHandler } from './TableHandler.svelte'
export { check } from './Comparator'
import type { UUID } from 'crypto'

export {
    Datatable,
    Search,
    RowsPerPage,
    Th,
    ThSort,
    ThFilter,
    Pagination,
    RowCount,
} from '$lib/src/shared'

export type Row = { [key: string]: any  }

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
    selectBy?: string,
    highlight?: boolean,
    i18n?: Internationalization,
}

export type Criterion = {
    value: unknown,
    check: Check
}

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

export type ColumnView = {
    index: number,
    name?: string,
    isVisible?: boolean,
    isFrozen?: boolean,
    toggle?: () => void
}