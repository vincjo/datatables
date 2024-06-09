export { default as TableHandler }  from './TableHandler.svelte'
export { default as ThFilter     }  from './ThFilter.svelte'

export {
    Datatable,
    Header,
    Search,
    RowsPerPage,
    Th,
    ThSort,
    Footer,
    Pagination,
    RowCount,
} from '$lib/shared'

export type Row = { [key: string]: any  }

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
    value?: any
}

export type Sort = {
    field?: string
    direction?: 'asc' | 'desc'
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