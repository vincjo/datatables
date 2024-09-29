import { untrack }              from 'svelte'
import AbstractTableHandler     from './AbstractTableHandler.svelte'

import SortHandler              from './handlers/SortHandler.svelte'
import FilterHandler            from './handlers/FilterHandler.svelte'
import SelectHandler            from './handlers/SelectHandler.svelte'
import PageHandler              from './handlers/PageHandler.svelte'
import SearchHandler            from './handlers/SearchHandler.svelte'

import type { Internationalization, Row, Field, Check, TableParams, ColumnView } from '$lib/src/client'

import ViewBuilder              from './builders/ViewBuilder.svelte'
import SearchBuilder            from './builders/SearchBuilder.svelte'
import FilterBuilder            from './builders/FilterBuilder.svelte'
import AdvancedFilterBuilder    from './builders/AdvancedFilterBuilder.svelte'
import CalculationBuilder       from './builders/CalculationBuilder.svelte'
import SortBuilder              from './builders/SortBuilder.svelte'
import CSVBuilder               from './builders/CSVBuilder.svelte'
import RecordFilterBuilder      from './builders/RecordFilterBuilder.svelte'


export default class TableHandler<T extends Row = any> extends AbstractTableHandler<T>
{
    public  i18n            : Internationalization
    private view            : ViewBuilder<T>
    private sortHandler     : SortHandler<T>
    private filterHandler   : FilterHandler<T>
    private selectHandler   : SelectHandler<T>
    private pageHandler     : PageHandler<T>
    private searchHandler   : SearchHandler<T>

    constructor(data: T[] = [], params: TableParams = { rowsPerPage: null })
    {
        super(data, params)
        this.translate(params.i18n)
        this.sortHandler    = new SortHandler(this)
        this.filterHandler  = new FilterHandler(this)
        this.selectHandler  = new SelectHandler(this)
        this.pageHandler    = new PageHandler(this)
        this.searchHandler  = new SearchHandler(this)
    }

    public setRows(data: T[]): void
    {
        this.rawRows = data
        untrack(() => {
            this.event.dispatch('change')
            this.sortHandler.restore()
        })
    }

    public setRowsPerPage(value: number): void
    {
        this.rowsPerPage = value
        this.setPage(1)
    }

    public setPage(value: number | 'previous' | 'next' | 'last'): void
    {
        switch (value) {
            case 'previous' : return this.pageHandler.previous()
            case 'next'     : return this.pageHandler.next()
            case 'last'     : return this.pageHandler.last()
            default         : return this.pageHandler.goto(value as number)
        }
    }

    public clearSearch(): void
    {
        this.search.value = ''
        this.event.dispatch('change')
        this.event.dispatch('clearSearch')
        this.setPage(1)
    }

    public createSearch(scope?: Field<T>[]): SearchBuilder<T>
    {
        return new SearchBuilder(this.searchHandler, scope)
    }

    public createRecordFilter(records?: Row[]): RecordFilterBuilder
    {
        return new RecordFilterBuilder(records)
    }

    public createSort(field: Field<T>, params?: { locales: Intl.LocalesArgument, options: Intl.CollatorOptions}): SortBuilder<T>
    {
        return new SortBuilder(this.sortHandler, field, params)
    }

    public clearFilters(): void
    {
        this.filters = []
        this.event.dispatch('change')
        this.event.dispatch('clearFilters')
        this.setPage(1)
    }

    public createAdvancedFilter(field: Field<T>, check?: Check): AdvancedFilterBuilder<T>
    {
        return new AdvancedFilterBuilder(this.filterHandler, field, check)
    }

    public createFilter(field: Field<T>, check?: Check): FilterBuilder<T>
    {
        return new FilterBuilder(this.filterHandler, field, check)
    }

    public select(value: T[keyof T]): void
    {
        this.selectHandler.set(value)
    }

    public selectAll(params: { scope?: 'all' | 'currentPage' } = {}): void
    {
        this.selectScope = (params.scope === 'all') ? 'all' : 'currentPage'
        this.selectHandler.all()
    }

    public getSelectedRows(): T[]
    {
        return this.selectHandler.getRows()
    }

    public clearSelection(): void
    {
        this.selectHandler.clear()
    }

    public on(event: 'change' | 'clearFilters' | 'clearSearch', callback: () => void)
    {
        this.event.add(event, callback)
    }

    public createCalculation(field: Field<T>): CalculationBuilder<T>
    {
        return new CalculationBuilder(this, field)
    }

    public createCSV(): CSVBuilder<T>
    {
        return new CSVBuilder(this)
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

    private translate(i18n: Internationalization): void
    {
        this.i18n = {
            ...{
                search: 'Search...',
                show: 'Show',
                entries: 'entries',
                filter: 'Filter',
                rowCount: 'Showing {start} to {end} of {total} entries',
                noRows: 'No entries found',
                previous: 'Previous',
                next: 'Next'
            },
            ...i18n
        }
    }
}
