import type Context from '$lib/local/Context'
import { type Writable, type Readable, get } from 'svelte/store'

export default class PageHandler<Row> 
{
    public pageNumber   : Writable<number>
    public rowCount     : Readable<{ total: number, start: number, end: number }>
    public rowsPerPage  : Writable<number | null>
    public triggerChange: Writable<number>
    public pages        : Readable<number[]>

    constructor(context: Context<Row>) 
    {
        this.pageNumber     = context.pageNumber
        this.rowCount       = context.rowCount
        this.rowsPerPage    = context.rowsPerPage
        this.triggerChange  = context.triggerChange
        this.pages          = context.pages
    }

    public get() 
    {
        return this.pages
    }

    public goto(number: number)
    {
        this.pageNumber.update((store) => {
            const rowsPerPage = get(this.rowsPerPage)
            if (rowsPerPage) {
                const total = get(this.rowCount).total
                if (number >= 1 && number <= Math.ceil(total / rowsPerPage)) {
                    store = number
                    this.triggerChange.update((store) => { return store + 1 })
                }
            }
            return store
        })
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
}
