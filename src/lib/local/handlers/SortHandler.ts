import type Context from '$lib/local/Context'
import type { Order, OrderBy } from '$lib/local'
import { type Writable, get } from 'svelte/store'



export default class SortHandler<Row> 
{
    private rawRows         : Writable<Row[]>
    private triggerChange   : Writable<number>
    private sorted          : Writable<(Order<Row>)>
    private history         : Order<Row>[]

    constructor(context: Context<Row>) 
    {
        this.rawRows        = context.rawRows
        this.triggerChange  = context.triggerChange
        this.sorted         = context.sorted
        this.history        = []
    }

    public set(orderBy: OrderBy<Row> = null)
    {
        if (!orderBy) return
        const sorted = get(this.sorted)
        const parsed = this.parse(orderBy)

        if (sorted.identifier !== parsed.identifier) {
            this.sorted.update((store) => (store.direction = null))
        }
        if (sorted.direction === null || sorted.direction === 'desc') {
            this.asc(orderBy)
        } 
        else if (sorted.direction === 'asc') {
            this.desc(orderBy)
        }
    }

    public asc(orderBy: OrderBy<Row>)
    {
        if (!orderBy) return
        const { identifier, fn } = this.parse(orderBy)
        this.sorted.set({ identifier, direction: 'asc', orderBy: fn })
        this.log({ identifier, direction: 'asc', orderBy: fn })
        this.rawRows.update((store) => {
            store.sort((x, y) => {
                const [a, b] = [fn(x), fn(y)]
                if (a === b) return 0
                if (a === null) return 1
                if (b === null) return -1
                if (typeof a === 'boolean') return a === false ? 1 : -1
                if (typeof a === 'string') return a.localeCompare(b as string)
                if (typeof a === 'number') return a - (b as number)
                if (typeof a === 'object') return JSON.stringify(a).localeCompare(JSON.stringify(b))
                else return String(a).localeCompare(String(b))
            })
            return store
        })
        this.triggerChange.update((store) => { return store + 1 })
    }

    public desc(orderBy: OrderBy<Row>)
    {
        if (!orderBy) return
        const { identifier, fn } = this.parse(orderBy)
        this.sorted.set({ identifier, direction: 'desc', orderBy: fn })
        this.log({ identifier, direction: 'desc', orderBy: fn })
        this.rawRows.update((store) => {
            store.sort((x, y) => {
                const [a, b] = [fn(x), fn(y)]
                if (a === b) return 0
                if (a === null) return 1
                if (b === null) return -1
                if (typeof b === 'boolean') return b === false ? 1 : -1
                if (typeof b === 'string') return b.localeCompare(a as string)
                if (typeof b === 'number') return b - (a as number)
                if (typeof b === 'object') return JSON.stringify(b).localeCompare(JSON.stringify(a))
                else return String(b).localeCompare(String(a))
            })
            return store
        })
        this.triggerChange.update((store) => { return store + 1 })
    }

    public apply(params: { orderBy: OrderBy<Row>, direction?: 'asc' | 'desc' } = null) 
    {
        if (params) {
            switch (params.direction) {
                case 'asc' : return this.asc(params.orderBy)
                case 'desc': return this.desc(params.orderBy)
                default    : return this.set(params.orderBy)
            }
        }
        else {
            this.replay()
        }
    }

    public remove()
    {
        this.history = []
        this.sorted.set({})
    }

    public define(orderBy: OrderBy<Row>, direction: 'asc' | 'desc' = 'asc')
    {
        if (!orderBy) return
        const { identifier, fn } = this.parse(orderBy)
        this.sorted.set({ identifier, direction, orderBy: fn })
    }

    private parse(orderBy: OrderBy<Row>)
    {
        if (typeof orderBy === 'string') {
            return {
                fn: (row: Row) => row[orderBy],
                identifier: orderBy.toString()
            }
        } else if (typeof orderBy === 'function') {
            return {
                fn: orderBy,
                identifier: orderBy.toString()
            }
        }
        throw new Error(`Invalid orderBy argument: ${String(orderBy)}`)
    }

    private replay()
    {
        for (const sorted of this.history) {
            const { identifier, orderBy, direction } = sorted
            const param = identifier.includes('=>') ? orderBy : identifier as OrderBy<Row>
            this[direction](param)
        }
    }

    private log(sorted: Order<Row>)
    {
        this.history = this.history.filter(item => item.identifier !== sorted.identifier )
        if (this.history.length >= 3) {
            const [_, slot2, slot3] = this.history
            this.history = [slot2, slot3, sorted]
        }
        this.history = [...this.history, sorted]
    }
}
