<<<<<<< HEAD
import type { RowCount } from '../Context'
import type Context from '../Context'
import { type Writable, type Readable, get } from 'svelte/store'

export default class Pages<T> {
    public pageNumber: Writable<number>
    public rowCount: Readable<RowCount>
    public rowsPerPage: Writable<number | null>
    public triggerChange: Writable<number>
    public pages: Readable<number[]>

    constructor(context: Context<T>) {
        this.pageNumber = context.pageNumber
        this.rowCount = context.rowCount
        this.rowsPerPage = context.rowsPerPage
        this.triggerChange = context.triggerChange
        this.pages = context.pages
    }

    public get() {
=======
import type Context from '$lib/core/Context'
import { type Writable, type Readable, get } from 'svelte/store'

export default class Pages<Row> 
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
>>>>>>> upstream/master
        return this.pages
    }

    public goto(number: number)
    {
        this.pageNumber.update((store) => {
<<<<<<< HEAD
            const $rowsPerPage = this.getRowsPerPage()
            if ($rowsPerPage) {
                const total = get(this.rowCount).total
                if (number >= 1 && number <= Math.ceil(total / $rowsPerPage)) {
                    store = number
                    this.triggerChange.update((store) => {
                        return store + 1
                    })
=======
            const rowsPerPage = get(this.rowsPerPage)
            if (rowsPerPage) {
                const total = get(this.rowCount).total
                if (number >= 1 && number <= Math.ceil(total / rowsPerPage)) {
                    store = number
                    this.triggerChange.update((store) => { return store + 1 })
>>>>>>> upstream/master
                }
            }
            return store
        })
    }

<<<<<<< HEAD
    public previous(): void {
        const number = get(this.pageNumber) - 1
        this.goTo(number)
    }

    public next(): void {
        const number = get(this.pageNumber) + 1
        this.goTo(number)
    }

    private getRowsPerPage(): number | null {
        let value = null
        this.rowsPerPage.subscribe((store) => (value = store))
        return value
=======
    public previous()
    {
        const number = get(this.pageNumber) - 1
        this.goto(number)
    }

    public next()
    {
        const number = get(this.pageNumber) + 1
        this.goto(number)
>>>>>>> upstream/master
    }
}
