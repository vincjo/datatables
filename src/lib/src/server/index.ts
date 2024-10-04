export { default as TableHandler }  from './TableHandler.svelte'

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
    type ColumnView,
    type Internationalization,
    type TableHandlerInterface
} from '$lib/src/shared'


export type State = {
    currentPage: number,
    rowsPerPage: number,
    offset: number,
    search: string | undefined,
    sort: Sort | undefined
    filters: Filter[] | undefined
    setTotalRows: (value: number) => void
}

export type Filter = {
    field: string
    value?: unknown
}

export type Sort = {
    field?: string
    direction?: 'asc' | 'desc'
}