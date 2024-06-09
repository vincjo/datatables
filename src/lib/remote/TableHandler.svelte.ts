import AbstractTableHandler from './AbstractTableHandler.svelte'

import FetchHandler         from './handlers/FetchHandler.svelte'
import SortHandler          from './handlers/SortHandler.svelte'
import SelectHandler        from './handlers/SelectHandler.svelte'
import PageHandler          from './handlers/PageHandler.svelte'
import SearchHandler        from './handlers/SearchHandler.svelte'
import FilterHandler        from './handlers/FilterHandler.svelte'

import ViewHelper           from './helpers/ViewHelper.svelte'
import SearchHelper         from './helpers/SearchHelper.svelte'
import SortHelper           from './helpers/SortHelper.svelte'

import type { Internationalization, Row, State } from '$lib/remote'

export type Params = {
    rowsPerPage     ?: number,
    totalRows       ?: number,
    selectBy        ?: keyof Row,
    i18n            ?: Internationalization
}

export default class TableHandler<T extends Row = any> extends AbstractTableHandler<Row>
{
    private fetchHandler    : FetchHandler<T>
    private sortHandler     : SortHandler<T>
    private selectHandler   : SelectHandler<T>
    private pageHandler     : PageHandler<T>
    private searchHandler   : SearchHandler<T>
    private filterHandler   : FilterHandler<T>
    public  i18n            : Internationalization
    private view            : ViewHelper

    constructor(data: T[] = [], params: Params = { rowsPerPage: 5 })
    {
        super(data, params)
        this.i18n           = this.translate(params.i18n)
        this.fetchHandler   = new FetchHandler(this)
        this.sortHandler    = new SortHandler(this)
        this.selectHandler  = new SelectHandler(this)
        this.pageHandler    = new PageHandler(this)
        this.searchHandler  = new SearchHandler(this)
        this.filterHandler  = new FilterHandler(this)
    }

    public load(callback: (state: State) => Promise<T[]>): void
    {
        this.fetchHandler.set(callback)
    }

    public invalidate(): void
    {
        this.fetchHandler.invalidate()
    }

    public setTotalRows(value: number): void
    {
        this.totalRows = value
    }

    public setRowsPerPage(value: number)
    {
        this.rowsPerPage = value
        this.setPage(1)
    }

    public setPage(value: number | 'previous' | 'next' | 'last'): void
    {
        switch (value) {
            case 'previous' : return this.pageHandler.previous()
            case 'next'     : return this.pageHandler.next()
            case 'last'     : return this.pageHandler.goto(this.pageCount)
            default         : return this.pageHandler.goto(value as number)
        }
    }

    public clearSearch(): void
    {
        this.searchHandler.clear()
    }

    public createSearch(): SearchHelper<T>
    {
        return new SearchHelper(this)
    }

    // public sort(field: string): void
    // {
    //     this.sortHandler.set(field)
    //     this.invalidate()
    //     this.setPage(1)
    // }

    // public sortAsc(field: string): void
    // {
    //     this.sortHandler.asc(field)
    //     this.invalidate()
    //     this.setPage(1)
    // }

    // public sortDesc(field: string): void
    // {
    //     this.sortHandler.desc(field)
    //     this.invalidate()
    //     this.setPage(1)
    // }

    public createSort(field: string): SortHelper<T>
    {
        return new SortHelper(this.sortHandler, field)
    }

    public filter(value: string | number, field: string): void
    {
        this.filterHandler.set(value, field)
        this.setPage(1)
    }

    public clearFilters(): void
    {
        this.filterHandler.clear()
        this.invalidate()
    }

    public select(value: T[keyof T] | T)
    {
        this.selectHandler.set(value)
    }

    public selectAll(): void
    {
        this.selectHandler.all()
    }

    public clearSelection(): void
    {
        this.selectHandler.clear()
    }

    public on(event: 'change' | 'clearFilters' | 'clearSearch', callback: () => void): void
    {
        this.events.add(event, callback)
    }

    public createView(columns: { name: string, index: number, isVisible?: boolean }[]): ViewHelper
    {
        this.view = new ViewHelper(columns)
        return this.view
    }

    public getView(): ViewHelper
    {
        return this.view
    }

    private translate(i18n: Internationalization): Internationalization
    {
        return {
            ...{
                search: 'Search...',
                show: 'Show',
                entries: 'entries',
                filter: 'Filter',
                rowCount: 'Showing {start} to {end} of {total} entries',
                noRows: 'No entries found',
                previous: 'Previous',
                next: 'Next',
                selectedCount: '{count} of {total} row(s).'
            },
            ...i18n
        }
    }

}