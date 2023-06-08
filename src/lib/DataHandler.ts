import Context, { type Comparator, type FilterBy, type FilterValue } from '$lib/core/Context'
import Rows from '$lib/core/Handlers/Rows'
import Pages from '$lib/core/Handlers/Pages'
import GlobalSearch from '$lib/core/Handlers/GlobalSearch'
import Filters from '$lib/core/Handlers/Filters'

import type { Readable, Writable } from 'svelte/store'
import type { Internationalization } from '$lib'

export type Params = { rowsPerPage?: number; i18n?: Internationalization }

export default class DataHandler<T extends { [key: string]: unknown } = any> {
    private context: Context<T>
    private rows: Rows<T>
    private pages: Pages<T>
    private globalSearch: GlobalSearch<T>
    private filters: Filters<T>
    public i18n: Internationalization

    constructor(data: T[] = [], params: Params = { rowsPerPage: null }) {
        this.i18n = this.translate(params.i18n)
        this.context = new Context(data, params)
        this.rows = new Rows(this.context)
        this.pages = new Pages(this.context)
        this.globalSearch = new GlobalSearch(this.context)
        this.filters = new Filters(this.context)
    }

    public setRows(data: T[]): void {
        this.context.rawRows.set(data)
        this.applySorting()
    }

    public getRows(): Readable<T[]> {
        return this.context.rows
    }

    public select(value: T): void {
        this.rows.select(value)
    }

    public getSelected() {
        return this.context.selected
    }

    public selectAll(params: { selectBy?: string; scope?: 'all' | 'currentPage' } = {}): void {
        this.context.selectScope.set(params.scope ?? 'all')
        this.rows.selectAll(params.selectBy ?? null)
    }

    public isAllSelected(): Readable<boolean> {
        return this.context.isAllSelected
    }

    public getRowCount(): Readable<{ total: number; start: number; end: number }> {
        return this.context.rowCount
    }

    public getRowsPerPage(): Writable<number | null> {
        return this.context.rowsPerPage
    }

    public sort(orderBy: Parameters<Rows<T>['sort']>[0]): void {
        this.setPage(1)
        this.rows.sort(orderBy)
    }

    public applySorting(
        params: {
            orderBy: (...args: any) => any | string
            direction?: 'asc' | 'desc' | null
        } | null = null
    ): void {
        this.rows.applySorting(params)
    }

    public sortAsc(orderBy: (...args: any) => any | string): void {
        this.setPage(1)
        this.rows.sortAsc(orderBy)
    }

    public sortDesc(orderBy: ((row: T) => T[keyof T]) | keyof T): void {
        this.setPage(1)
        this.rows.sortDesc(orderBy)
    }

    public getSorted(): Writable<{ identifier: string | null; direction: 'asc' | 'desc' | null }> {
        return this.context.sorted
    }

    public search(value: string, scope: string[] = null): void {
        this.globalSearch.set(value, scope)
    }

    public clearSearch(): void {
        this.globalSearch.remove()
    }

    public filter<FB extends FilterBy<T>, V extends FilterValue<T, FB>>(
        value: V,
        filterBy: FilterBy<T>,
        comparator?: Comparator<T>
    ): void {
        return this.filters.set(value as string | number, filterBy, comparator)
    }

    public clearFilters(): void {
        this.filters.remove()
    }

    public getPages(params = { ellipsis: false }): Readable<number[]> {
        if (params.ellipsis) {
            return this.context.pagesWithEllipsis
        }
        return this.context.pages
    }

    public getPageCount(): Readable<number> {
        return this.context.pageCount
    }

    public getPageNumber(): Readable<number> {
        return this.context.pageNumber
    }

    public setPage(value: number | 'previous' | 'next'): void {
        switch (value) {
            case 'previous':
                return this.pages.previous()
            case 'next':
                return this.pages.next()
            default:
                return this.pages.goTo(value as number)
        }
    }

    public getTriggerChange(): Writable<number> {
        return this.context.triggerChange
    }

    public translate(i18n: Internationalization): Internationalization {
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
     * Deprecated
     * use setRows() instead
     */
    public update(data: any[]): void {
        console.log(
            '%c%s',
            'color:#e65100;background:#fff3e0;font-size:12px;border-radius:4px;padding:4px;text-align:center;',
            `DataHandler.update(data) method is deprecated. Please use DataHandler.setRows(data) instead`
        )
        this.context.rawRows.set(data)
    }
}
