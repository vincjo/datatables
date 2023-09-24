import type Context from '$lib/remote/Context'
import { type Writable, type Readable, get } from 'svelte/store'
import type EventHandler from './EventHandler'

export default class PageHandler<Row>
{
    public totalRows    : Writable<number>
    public currentPage  : Writable<number>
    public rowCount     : Readable<{ total: number, start: number, end: number }>
    public rowsPerPage  : Writable<number | null>
    public event        : EventHandler
    public pages        : Readable<number[]>
    public selected     : Writable<(Row | Row[keyof Row])[]>

    constructor(context: Context<Row>)
    {
        this.totalRows      = context.totalRows
        this.currentPage    = context.currentPage
        this.rowCount       = context.rowCount
        this.rowsPerPage    = context.rowsPerPage
        this.event          = context.event
        this.pages          = context.pages
        this.selected       = context.selected
    }

    public get()
    {
        return this.pages
    }

    public goto(page: number)
    {
        const rowsPerPage = get(this.rowsPerPage)
        const totalRows = get(this.totalRows)

        this.currentPage.update((store) => {
            if (rowsPerPage && totalRows) {
                if (page >= 1 && page <= Math.ceil(totalRows / rowsPerPage)) {
                    store = page
                    this.event.trigger('change')
                }
                return store
            }
            else {
                if (page >= 1) {
                    store = page
                    this.event.trigger('change')
                }
                return store
            }
        })
        this.selected.set([])
    }

    public previous()
    {
        const page = get(this.currentPage) - 1
        this.goto(page)
    }

    public next()
    {
        const page = get(this.currentPage) + 1
        this.goto(page)
    }
}
