import TableHandler     from './TableHandler.svelte'
import Datatable        from './Datatable.svelte'
import Search           from './Search.svelte'
import RowsPerPage      from './RowsPerPage.svelte'
import Th               from './Th.svelte'
import ThFilter         from './ThFilter.svelte'
import RowCount         from './RowCount.svelte'
import SelectedCount    from './SelectedCount.svelte'
import Pagination       from './Pagination.svelte'
import Footer           from './Footer.svelte'
import Header           from './Header.svelte'

export { TableHandler, Datatable, Search, RowsPerPage, Th, ThFilter, RowCount, SelectedCount, Pagination, Footer, Header }


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
    search          ?: string
    show            ?: string
    entries         ?: string
    filter          ?: string
    rowCount        ?: string
    noRows          ?: string
    previous        ?: string
    next            ?: string
    selectedCount   ?: string
}