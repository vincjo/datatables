import Context           from '$lib/core/Context'
import Rows              from '$lib/core/Handlers/Rows'
import Pages             from '$lib/core/Handlers/Pages'
import GlobalSearch      from '$lib/core/Handlers/GlobalSearch'
import Filters           from '$lib/core/Handlers/Filters'

import type { Readable, Writable } from 'svelte/store'

export type params = { rowsPerPage: number | null }

export default class DataHandler
{
    private context      : Context
    private rows         : Rows
    private pages        : Pages
    private globalSearch : GlobalSearch
    private filters      : Filters

    constructor(data = [] as any[], params: params = { rowsPerPage: null })
    {
        this.context      = new Context(data, params)
        this.rows         = new Rows(this.context)
        this.pages        = new Pages(this.context)
        this.globalSearch = new GlobalSearch(this.context)
        this.filters      = new Filters(this.context)
    }

    public set(data: any[]): void
    {
        this.context.rawRows.set(data)
    }

    public getRows(): Readable<any[]>
    {
        return this.context.rows
    }

    public getRowCount(): Readable<{ total: number; start: number; end: number; }>
    {
        return this.context.rowCount
    }

    public sort(orderBy: Function | string): void
    {
        this.setPage(1)
        this.rows.sort(orderBy)
    }

    public sortAsc(orderBy: Function | string): void
    {
        this.setPage(1)
        this.rows.sortAsc(orderBy)
    }

    public sortDesc(orderBy: Function | string): void
    {
        this.setPage(1)
        this.rows.sortDesc(orderBy)
    }

    public getSorted()
    {
        return this.context.sorted
    }

    public search(value: string): void
    {
        this.globalSearch.set(value)
    }

    public clearSearch(): void
    {
        this.globalSearch.remove()
    }

    public filter(value: string, key: ( (row: any) => string | number | boolean ) | string): void
    {
        return this.filters.set(value, key)
    }

    public getPages(): Readable<number[]>
    {
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

    public getRowsPerPage(): Writable<number | null>
    {
        return this.context.rowsPerPage
    }

    public setPage(value: number | string): void
    {
        switch(value) {
            case 'previous': return this.pages.previous()
            case 'next'    : return this.pages.next()
            default        : return this.pages.goTo(value as number)
        }
    }

    public getSlicedPages(): Readable<number[]>
    {
        return this.context.slicedPages
    }

    public getTriggerChange(): Writable<number>
    {
        return this.context.triggerChange
    }

    public updateParams(params: params): void
    {
        this.setPage(1)
        if (!params) {
            this.context.rowsPerPage.set(null)
        }
        this.context.rowsPerPage.set(params.rowsPerPage)
    }
}