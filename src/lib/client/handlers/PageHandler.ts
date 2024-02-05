import type Context from '$lib/client/Context'
import { type Writable, type Readable, get } from 'svelte/store'
import type { EventsHandler } from '$lib/client'

export default class PageHandler<Row> 
{
    private currentPage : Writable<number>
    private rowCount    : Readable<{ total: number, start: number, end: number }>
    private rowsPerPage : Writable<number | null>
    private events      : EventsHandler

    constructor(context: Context<Row>) 
    {
        this.currentPage    = context.currentPage
        this.rowCount       = context.rowCount
        this.rowsPerPage    = context.rowsPerPage
        this.events         = context.events
    }

    public goto(page: number)
    {
        this.currentPage.update((store) => {
            const rowsPerPage = get(this.rowsPerPage)
            if (rowsPerPage) {
                const { total } = get(this.rowCount)
                if (page >= 1 && page <= Math.ceil(total / rowsPerPage)) {
                    store = page
                    this.events.trigger('change')
                }
            }
            return store
        })
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
