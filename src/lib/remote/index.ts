export { default as TableHandler }  from './TableHandler.svelte'
export { default as ThFilter     }  from './ThFilter.svelte'
export { default as Search       }  from './Search.svelte'
export { default as Th           }  from './Th.svelte'

export { Datatable, RowsPerPage, RowCount, Pagination, Footer, Header } from '$lib/shared'

export type Row = { [key: string]: any }

export type State = {
    currentPage: number,
    rowsPerPage: number,
    offset: number,
    search: string | undefined,
    sorting: Sorting | undefined
    filters: Filter[] | undefined
    setTotalRows: (value: number) => void
}

export type Filter = {
    field: string
    value?: any
}

export type Sorting = {
    field?: string
    direction?: 'asc' | 'desc'
}

export type Internationalization = {
    search          ?: string,
    show            ?: string,
    entries         ?: string,
    filter          ?: string,
    rowCount        ?: string,
    noRows          ?: string,
    previous        ?: string,
    next            ?: string,
    selectedCount   ?: string,
}