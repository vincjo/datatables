export { default as TableHandler } from './TableHandler.svelte'
export { check } from './Comparator'

export {
    Datatable,
    Search,
    RowsPerPage,
    Th,
    ThSort,
    ThFilter,
    Pagination,
    RowCount,
} from '$lib/shared'

export type Row = { [key: string]: any  }

export type Field<Row> = keyof Row | ((row: Row) => Row[keyof Row])

export type Filter<Row> = {
    callback: (row: Row) => Row[keyof Row]
    identifier: string
    value?: string | number | boolean | symbol | Criterion[]
    check?: Check<Row>
    key?: string,
}

export type Sort<Row> = {
    callback?: (row: Row) => Row[keyof Row]
    identifier?: string
    direction?: 'asc' | 'desc'
    key?: string,
}

export type Check<Row> = (entry: Row[keyof Row], value: any) => boolean

export type TableHandlerParams = {
    rowsPerPage?: number,
    selectBy?: string,
    highlight?: boolean,
    i18n?: Internationalization,
}

export type Criterion = {
    value: string | number | number[],
    check: Check<Row>
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

export type ViewColumn = {
    index: number,
    name?: string,
    isVisible?: boolean,
    isFrozen?: boolean,
    toggle?: () => void
}