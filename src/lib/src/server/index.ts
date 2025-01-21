export { default as TableHandler }  from './TableHandler.svelte'
import type { Row, Internationalization } from '$lib/src/shared/index.js'
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
    type Field,
    type ColumnView,
    type Internationalization,
    type TableHandlerInterface
} from '$lib/src/shared'

export type State<T extends Row = any> = {
    currentPage : number,
    rowsPerPage : number,
    offset      : number,
    search     ?: string,
    sort       ?: Sort<T>
    filters    ?: Filter<T>[]
    setTotalRows: (value: number) => void
}

export type TableParams<Row> = {
    rowsPerPage     ?: number,
    totalRows       ?: number,
    selectBy        ?: keyof Row,
    i18n            ?: Internationalization
}

export type Filter<Row> = {
    field: keyof Row
    value?: unknown
}

export type Sort<Row> = {
    field?: keyof Row
    direction?: 'asc' | 'desc'
}