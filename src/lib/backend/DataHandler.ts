import Context from '$lib/backend/core/Context'
import Rows from '$lib/backend/core/Handlers/Rows'
import Pages from '$lib/backend/core/Handlers/Pages'
import GlobalSearch from '$lib/backend/core/Handlers/GlobalSearch'
import Filters from '$lib/backend/core/Handlers/Filters'

import type { Readable, Writable } from 'svelte/store'
import type { Internationalization } from '$lib'

export type Params = { rowsPerPage?: number; i18n?: Internationalization; rowCount?: number }

export default class DataHandler {
    private context: Context
    private rows: Rows
    private pages: Pages
    private globalSearch: GlobalSearch
    private filters: Filters
    public i18n: Internationalization

    constructor(data = [] as any[], params: Params = { rowsPerPage: null }) {
        this.i18n = this.translate(params.i18n)
        this.context = new Context(data, params)
        this.rows = new Rows(this.context)
        this.pages = new Pages(this.context)
        this.globalSearch = new GlobalSearch(this.context)
        this.filters = new Filters(this.context)
    }

    public setRows(data: any[]): void {
        this.context.rows.set(data)
    }

    public getRows(): Readable<any[]> {
        return this.context.rows
    }

    public select(value: any): void {
        this.rows.select(value)
    }

    public getSelected(): Writable<any[]> {
        return this.context.selected
    }

    public selectAll(params: { selectBy?: string } = {}): void {
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

    public sort(orderBy: Function | string): void {
        this.setPage(1)
        this.rows.sort(orderBy)
    }

    public sortAsc(orderBy: Function | string): void {
        this.setPage(1)
        this.rows.sortAsc(orderBy)
    }

    public sortDesc(orderBy: Function | string): void {
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

    public filter(
        value: string,
        filterBy: ((row: any) => string | number | boolean) | string,
        comparator: Function = null
    ): void {
        return this.filters.set(value, filterBy, comparator)
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
}
