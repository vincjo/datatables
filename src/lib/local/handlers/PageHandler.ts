import type Context from '$lib/local/Context'
import { type Writable, type Readable, get } from 'svelte/store'
import type { EventHandler } from '$lib/local'

export default class PageHandler<Row> 
{
    private pageNumber  : Writable<number>
    private rowCount    : Readable<{ total: number, start: number, end: number }>
    private rowsPerPage : Writable<number | null>
    private event       : EventHandler
    private selected    : Writable<(Row | Row[keyof Row])[]>
    private selectScope : Writable<'all' | 'currentPage'>

    constructor(context: Context<Row>) 
    {
        this.pageNumber     = context.pageNumber
        this.rowCount       = context.rowCount
        this.rowsPerPage    = context.rowsPerPage
        this.event          = context.event
        this.selectScope    = context.selectScope
        this.selected       = context.selected
    }

    public goto(number: number)
    {
        this.pageNumber.update((store) => {
            const rowsPerPage = get(this.rowsPerPage)
            if (rowsPerPage) {
                const total = get(this.rowCount).total
                if (number >= 1 && number <= Math.ceil(total / rowsPerPage)) {
                    store = number
                    this.event.trigger('change')
                }
            }
            return store
        })
        this.deselect()
    }

    public previous()
    {
        const number = get(this.pageNumber) - 1
        this.goto(number)
    }

    public next()
    {
        const number = get(this.pageNumber) + 1
        this.goto(number)
    }

    public deselect()
    {
        const scope = get(this.selectScope)
        if (scope === 'currentPage') {
            this.selected.set([])
        }
    }
}
