import AbstractTableHandler from './AbstractTableHandler.svelte'

import FetchHandler         from './handlers/FetchHandler.svelte'
import SortHandler          from './handlers/SortHandler.svelte'
import SelectHandler        from './handlers/SelectHandler.svelte'
import PageHandler          from './handlers/PageHandler.svelte'
import SearchHandler        from './handlers/SearchHandler.svelte'
import FilterHandler        from './handlers/FilterHandler.svelte'

import ViewBuilder          from '../shared/builders/ViewBuilder.svelte'
import SearchBuilder        from './builders/SearchBuilder.svelte'
import SortBuilder          from './builders/SortBuilder.svelte'
import FilterBuilder        from './builders/FilterBuilder.svelte'

import type { Internationalization, Row, Field, State, ColumnView, TableParams } from '$lib/src/server'
import type { TableHandlerInterface } from '$lib/src/shared'



export default class TableHandler<T extends Row = any> extends AbstractTableHandler<T> implements TableHandlerInterface<T>
{
    private fetchHandler    : FetchHandler<T>
    private sortHandler     : SortHandler<T>
    private selectHandler   : SelectHandler<T>
    private pageHandler     : PageHandler<T>
    private searchHandler   : SearchHandler<T>
    private filterHandler   : FilterHandler<T>
    private view            : ViewBuilder<T>
    public  i18n            : Internationalization

    constructor(data: T[] = [], params: TableParams<T> = { rowsPerPage: 5 })
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

    public load(callback: (state: State<T>) => Promise<T[]>): void
    {
        this.fetchHandler.set(callback)
    }

    public invalidate(): void
    {
        this.fetchHandler.invalidate()
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

    public createSearch(value?: string): SearchBuilder<T>
    {
        return new SearchBuilder(this, value)
    }

    public createSort(field: Field<T>, init?: 'asc' | 'desc'): SortBuilder<T>
    {
        if (typeof field === 'function') {
            throw new Error(`Invalid field argument: ${String(field)}. Function type arguments are not allowed in server-side mode`)
        }
        return new SortBuilder(this.sortHandler, field, init)
    }

    public clearFilters(): void
    {
        this.filterHandler.clear()
        this.invalidate()
    }

    public createFilter(field: Field<T>, value?: string): FilterBuilder<T>
    {
        if (typeof field === 'function') {
            throw new Error(`Invalid field argument: ${String(field)}. Function type arguments are not allowed in server-side mode`)
        }
        return new FilterBuilder(this.filterHandler, field, value)
    }

    public select(value: T[keyof T])
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
        this.event.add(event, callback)
    }

    public createView(columns: ColumnView[]): ViewBuilder<T>
    {
        this.view = new ViewBuilder(this, columns)
        return this.view
    }

    public getView(): ViewBuilder<T>
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