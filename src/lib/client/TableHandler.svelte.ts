import { untrack } from 'svelte'
import AbstractTableHandler     from './AbstractTableHandler.svelte'

import SortHandler              from './handlers/SortHandler.svelte'
import FilterHandler            from './handlers/FilterHandler.svelte'
import SelectHandler            from './handlers/SelectHandler.svelte'
import PageHandler              from './handlers/PageHandler.svelte'
import SearchHandler            from './handlers/SearchHandler.svelte'

import type { Internationalization, Row, Field, Check, TableHandlerParams, ViewColumn } from '$lib/client'

import ViewHelper               from './helpers/ViewHelper.svelte'
import SearchHelper             from './helpers/SearchHelper.svelte'
import FilterHelper             from './helpers/FilterHelper.svelte'
import AdvancedFilterHelper     from './helpers/AdvancedFilterHelper.svelte'
import CalculationHelper        from './helpers/CalculationHelper.svelte'
import SortHelper               from './helpers/SortHelper.svelte'
import CSVHelper                from './helpers/CSVHelper.svelte'
import RecordFilterHelper       from './helpers/RecordFilterHelper.svelte'

export default class TableHandler<T extends Row = any> extends AbstractTableHandler<T>
{
    public  i18n            : Internationalization
    private view            : ViewHelper
    private sortHandler     : SortHandler<T>
    private filterHandler   : FilterHandler<T>
    private selectHandler   : SelectHandler<T>
    private pageHandler     : PageHandler<T>
    private searchHandler   : SearchHandler<T>

    constructor(data: T[] = [], params: TableHandlerParams = { rowsPerPage: null })
    {
        super(data, params)
        this.translate(params.i18n)
        this.sortHandler    = new SortHandler(this)
        this.filterHandler  = new FilterHandler(this)
        this.selectHandler  = new SelectHandler(this)
        this.pageHandler    = new PageHandler(this)
        this.searchHandler  = new SearchHandler(this)
    }

    public setRows(data: T[])
    {
        this.rawRows = data
        this.event.dispatch('change')
        untrack(() => this.sortHandler.apply())
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
            case 'last'     : return this.pageHandler.goto(this.pageCount)
            default         : return this.pageHandler.goto(value as number)
        }
    }

    public clearSearch()
    {
        this.searchHandler.clear()
    }

    public createSearch(scope?: Field<T>[]): SearchHelper<T>
    {
        return new SearchHelper(this, scope)
    }

    public createRecordFilter(records?: Row[]): RecordFilterHelper
    {
        return new RecordFilterHelper(records)
    }

    public createSort(field: Field<T>, params?: { locales: Intl.LocalesArgument, options: Intl.CollatorOptions}): SortHelper<T>
    {
        return new SortHelper(this.sortHandler, field, params)
    }

    public filter(value: any, field: Field<T>, check?: Check<T>): void
    {
        this.filterHandler.set(value, field, check)
    }

    public clearFilters(): void
    {
        this.filters = []
        this.event.dispatch('change')
        this.event.dispatch('clearFilters')
    }

    public createAdvancedFilter(field: Field<T>, check?: Check<T>): AdvancedFilterHelper<T>
    {
        return new AdvancedFilterHelper(this.filterHandler, field, check)
    }

    public createFilter(field: Field<T>, check?: Check<T>): FilterHelper<T>
    {
        return new FilterHelper(this.filterHandler, field, check)
    }

    public select(value: T[keyof T])
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

    public createCalculation(field: Field<T>): CalculationHelper<T>
    {
        return new CalculationHelper(this, field)
    }

    public createCSV(): CSVHelper<T>
    {
        return new CSVHelper(this)
    }

    public createView(columns: ViewColumn[]): ViewHelper
    {
        this.view = new ViewHelper(this, columns)
        return this.view
    }

    public getView(): ViewHelper
    {
        return this.view
    }

    private translate(i18n: Internationalization)
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
