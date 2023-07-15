import Context                  from './Context'
import SortHandler              from './handlers/SortHandler'
import SelectHandler            from './handlers/SelectHandler'
import PageHandler              from './handlers/PageHandler'
import SearchHandler            from './handlers/SearchHandler'
import FilterHandler            from './handlers/FilterHandler'

import AdvancedFilterHelper     from './helpers/AdvancedFilterHelper'
import CalculationHelper        from './helpers/CalculationHelper'

import type { Readable, Writable } from 'svelte/store'
import type { Internationalization, Row, Field, Comparator } from '$lib/local'

export type Params = { rowsPerPage?: number, i18n?: Internationalization }

export default class DataHandler<T extends Row = any>
{
    private context         : Context<T>
    private sortHandler     : SortHandler<T>
    private selectHandler   : SelectHandler<T>
    private pageHandler     : PageHandler<T>
    private searchHandler   : SearchHandler<T>
    private filterHandler   : FilterHandler<T>
    public  i18n            : Internationalization

    constructor(data: T[] = [], params: Params = { rowsPerPage: null })
    {
        this.i18n           = this.translate(params.i18n)
        this.context        = new Context(data, params)
        this.sortHandler    = new SortHandler(this.context)
        this.selectHandler  = new SelectHandler(this.context)
        this.pageHandler    = new PageHandler(this.context)
        this.searchHandler  = new SearchHandler(this.context)
        this.filterHandler  = new FilterHandler(this.context)
    }

    public setRows(data: T[])
    {
        this.context.rawRows.set(data)
        this.applySort()
    }

    public getRows(): Readable<T[]>
    {
        return this.context.pagedRows
    }

    public select(value: T | T[keyof T])
    {
        this.selectHandler.set(value)
    }

    public getSelected()
    {
        return this.context.selected
    }

    public selectAll(params: { selectBy?: keyof T; scope?: 'all' | 'currentPage' } = {}): void
    {
        this.context.selectScope = params.scope ?? 'all'
        this.selectHandler.all(params.selectBy ?? null)
    }

    public isAllSelected(): Readable<boolean>
    {
        return this.context.isAllSelected
    }

    public getRowCount(): Readable<{ total: number, start: number, end: number }>
    {
        return this.context.rowCount
    }

    public getRowsPerPage(): Writable<number | null>
    {
        return this.context.rowsPerPage
    }

    public sort(orderBy: Field<T>)
    {
        this.setPage(1)
        this.sortHandler.set(orderBy)
    }

    public applySort( params: { orderBy: Field<T>, direction?: 'asc' | 'desc' } = null )
    {
        this.sortHandler.apply(params)
    }

    public sortAsc(orderBy: Field<T>)
    {
        this.setPage(1)
        this.sortHandler.asc(orderBy)
    }

    public sortDesc(orderBy: Field<T>)
    {
        this.setPage(1)
        this.sortHandler.desc(orderBy)
    }

    public getSort(): Writable<{ identifier?: string, direction?: 'asc' | 'desc' }>
    {
        return this.context.sort
    }

    public clearSort()
    {
        this.sortHandler.clear()
    }

    public defineSort(orderBy: Field<T>, direction?: 'asc' | 'desc')
    {
        this.sortHandler.define(orderBy, direction)
    }

    public search(value: string, scope: Field<T>[] = null)
    {
        this.searchHandler.set(value, scope)
    }

    public clearSearch()
    {
        this.searchHandler.remove()
    }

    public filter( value: string | number | null | undefined | boolean, filterBy: Field<T>, comparator: Comparator<T> = null )
    {
        this.filterHandler.set(value, filterBy, comparator)
    }

    public createAdvancedFilter(filterBy: Field<T>)
    {
        return new AdvancedFilterHelper(this.context, filterBy)
    }

    public getFilterCount(): Readable<number>
    {
        return this.context.filterCount
    }

    public clearFilters(): void
    {
        this.filterHandler.clear()
    }

    public getPages(param = { ellipsis: false }): Readable<number[]>
    {
        if (param.ellipsis) {
            return this.context.pagesWithEllipsis
        }
        return this.context.pages
    }

    public getPageCount(): Readable<number>
    {
        return this.context.pageCount
    }

    public getPageNumber(): Readable<number>
    {
        return this.context.pageNumber
    }

    public setPage(value: number | 'previous' | 'next'): void
    {
        switch (value) {
            case 'previous' : return this.pageHandler.previous()
            case 'next'     : return this.pageHandler.next()
            default         : return this.pageHandler.goto(value as number)
        }
    }

    public getTriggerChange(): Writable<number>
    {
        return this.context.event.triggerChange
    }

    public on(event: 'change' | 'clearFilters' | 'clearSearch', callback: () => void)
    {
        this.context.event.add(event, callback)
    }

    public createCalculation(field: Field<T>, param: { precision: number } = null)
    {
        return new CalculationHelper(this.context, field, { precision: param?.precision ?? 2 })
    }

    public translate(i18n: Internationalization): Internationalization
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
                next: 'Next'
            },
            ...i18n
        }
    }




    /**
     * @deprecated use setRows() instead
     * @since v0.9.99 2023-01-16
     */
    public update(data: any[]): void
    {
        console.log(
            '%c%s',
            'color:#e65100;background:#fff3e0;font-size:12px;border-radius:4px;padding:4px;text-align:center;',
            `DataHandler.update(data) method is deprecated. Please use DataHandler.setRows(data) instead`
        )
        this.context.rawRows.set(data)
    }

    /**
     * @deprecated use applySort() instead
     * @since v1.11.0 2023-07-11
     */
    public applySorting( params: { orderBy: Field<T>, direction?: 'asc' | 'desc' } = null )
    {
        this.applySort(params)
    }

    /**
     * @deprecated use getSort() instead
     * @since v1.11.0 2023-07-11
     */
    public getSorted()
    {
        return this.getSort()
    }
}
