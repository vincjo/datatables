import AbstractTableHandler     from './AbstractTableHandler.svelte'

import SortingHandler           from './handlers/SortingHandler.svelte'
import FilterHandler            from './handlers/FilterHandler.svelte'
import SelectHandler            from './handlers/SelectHandler.svelte'
import PageHandler              from './handlers/PageHandler.svelte'
import SearchHandler            from './handlers/SearchHandler.svelte'

import type { Internationalization, Row, Field, Check } from '$lib/client'

import ViewHelper               from './helpers/ViewHelper.svelte'
import SearchHelper             from './helpers/SearchHelper.svelte'
import FilterHelper             from './helpers/FilterHelper.svelte'
import AdvancedFilterHelper     from './helpers/AdvancedFilterHelper.svelte'
import CalculationHelper        from './helpers/CalculationHelper.svelte'
import SortingHelper            from './helpers/SortingHelper.svelte'
import CSVHelper                from './helpers/CSVHelper.svelte'

export type Params = { rowsPerPage?: number, i18n?: Internationalization, selectBy?: string }

export default class TableHandler<T extends Row = any> extends AbstractTableHandler<T>
{
    public  i18n            : Internationalization
    private view            : ViewHelper
    private sortingHandler  : SortingHandler<T>
    private filterHandler   : FilterHandler<T>
    private selectHandler   : SelectHandler<T>
    private pageHandler     : PageHandler<T>
    private searchHandler   : SearchHandler<T>

    constructor(data: T[] = [], params: Params = { rowsPerPage: null })
    {
        super(data, params)
        this.translate(params.i18n)
        this.sortingHandler = new SortingHandler(this)
        this.filterHandler  = new FilterHandler(this)
        this.selectHandler  = new SelectHandler(this)
        this.pageHandler    = new PageHandler(this)
        this.searchHandler  = new SearchHandler(this)
    }

    public setRows(data: T[])
    {
        this.rawRows = data
        this.events.trigger('change')
        this.sortingHandler.apply()
    }

    public setRowsPerPage(value: number): void
    {
        this.rowsPerPage = value
        this.setPage(1)
    }

    public setPage(value: number | 'previous' | 'next'): void
    {
        switch (value) {
            case 'previous' : return this.pageHandler.previous()
            case 'next'     : return this.pageHandler.next()
            default         : return this.pageHandler.goto(value as number)
        }
    }

    public clearSearch()
    {
        this.searchHandler.clear()
    }

    public createSearch(items?: any[]): SearchHelper
    {
        return new SearchHelper(items)
    }

    public sort(field: Field<T>)
    {
        this.setPage(1)
        this.sortingHandler.set(field, field.toString())
    }

    public sortAsc(field: Field<T>)
    {
        this.setPage(1)
        this.sortingHandler.asc(field, field.toString())
    }

    public sortDesc(field: Field<T>)
    {
        this.setPage(1)
        this.sortingHandler.desc(field, field.toString())
    }

    public createSorting(field: Field<T>): SortingHelper<T>
    {
        return new SortingHelper(this.sortingHandler, field)
    }

    public filter(value: any, field: Field<T>, check?: Check<T>): void
    {
        this.filterHandler.set(value, field, check)
    }

    public clearFilters(): void
    {
        this.filters = []
        this.events.trigger('change')
        this.events.trigger('clearFilters')
    }

    public createAdvancedFilter(field: Field<T>, check?: Check<T>): AdvancedFilterHelper<T>
    {
        return new AdvancedFilterHelper(this.filterHandler, field, check)
    }

    public createFilter(field: Field<T>, check?: Check<T>): FilterHelper<T>
    {
        return new FilterHelper(this.filterHandler, field, check)
    }

    public select(value: T | T[keyof T])
    {
        this.selectHandler.set(value)
    }

    public selectAll(params: { scope?: 'all' | 'currentPage' } = {}): void
    {
        this.selectScope = (params.scope === 'all') ? 'all' : 'currentPage'
        this.selectHandler.all()
    }

    public clearSelection(): void
    {
        this.selectHandler.clear()
    }


    public on(event: 'change' | 'clearFilters' | 'clearSearch', callback: () => void)
    {
        this.events.add(event, callback)
    }

    public createCalculation(field: Field<T>, param?: { precision: number }): CalculationHelper<T>
    {
        return new CalculationHelper(this, field, { precision: param?.precision ?? 2 })
    }

    public createCSV()
    {
        return new CSVHelper(this)
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
