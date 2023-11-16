import type Context from '$lib/remote/Context'
import { type Writable, type Readable, get } from 'svelte/store'
import type EventsHandler from './EventsHandler'

export default class PageHandler<Row>
{
    public totalRows        : Writable<number>
    public currentPage      : Writable<number>
    public rowCount         : Readable<{ total: number, start: number, end: number }>
    public rowsPerPage      : Writable<number | null>
    public events           : EventsHandler
    public pages            : Readable<number[]>
    public selection        : Writable<{ [page: number]: (Row | Row[keyof Row])[] }>
    public selectionScope   : 'currentPage' | 'acrossPages'

    constructor(context: Context<Row>)
    {
        this.totalRows          = context.totalRows
        this.currentPage        = context.currentPage
        this.rowCount           = context.rowCount
        this.rowsPerPage        = context.rowsPerPage
        this.events             = context.events
        this.pages              = context.pages
        this.selection          = context.selection
        this.selectionScope     = context.selectionScope
    }

    public get()
    {
        return this.pages
    }

    public goto(number: number)
    {
        const rowsPerPage = get(this.rowsPerPage)
        const totalRows = get(this.totalRows)

        this.currentPage.update((store) => {
            if (rowsPerPage && totalRows) {
                if (number >= 1 && number <= Math.ceil(totalRows / rowsPerPage)) {
                    store = number
                    this.events.trigger('change')
                }
                return store
            }
            else {
                if (number >= 1) {
                    store = number
                    this.events.trigger('change')
                }
                return store
            }
        })
        if (this.selectionScope === 'currentPage') {
            this.selection.set({ 0: [] })
        }
    }

    public previous()
    {
        const number = get(this.currentPage) - 1
        this.goto(number)
    }

    public next()
    {
        const number = get(this.currentPage) + 1
        this.goto(number)
    }
}
