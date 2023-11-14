import type Context from '$lib/client/Context'
import type { Sort, Field, EventsHandler } from '$lib/client'
import { type Writable, get } from 'svelte/store'
import { parseField } from '$lib/client/utils'

export default class SortHandler<Row> 
{
    private rawRows     : Writable<Row[]>
    private events      : EventsHandler
    private sort        : Writable<(Sort<Row>)>
    private backup      : Sort<Row>[]

    constructor(context: Context<Row>) 
    {
        this.rawRows    = context.rawRows
        this.events     = context.events
        this.sort       = context.sort
        this.backup     = []
    }

    public set(orderBy: Field<Row> = null)
    {
        if (!orderBy) return
        const sort = get(this.sort)
        const { identifier } = parseField(orderBy)

        if (sort.identifier !== identifier) {
            this.sort.update((store) => (store.direction = null))
        }
        if (sort.direction === null || sort.direction === 'desc') {
            this.asc(orderBy)
        } 
        else if (sort.direction === 'asc') {
            this.desc(orderBy)
        }
    }

    public asc(orderBy: Field<Row>, direction: 'asc' = 'asc')
    {
        if (!orderBy) return
        const { identifier, callback, key } = parseField(orderBy)
        this.sort.set({ identifier, callback, direction, key })
        this.rawRows.update((store) => {
            store.sort((x, y) => {
                const [a, b] = [callback(x), callback(y)]
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
        this.save({ identifier, callback, direction })
        this.events.trigger('change')
    }

    public desc(orderBy: Field<Row>, direction: 'desc' = 'desc')
    {
        if (!orderBy) return
        const { identifier, callback, key } = parseField(orderBy)
        this.sort.set({ identifier, callback, direction, key })
        this.rawRows.update((store) => {
            store.sort((x, y) => {
                const [a, b] = [callback(x), callback(y)]
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
        this.save({ identifier, callback, direction })
        this.events.trigger('change')
    }

    public apply(params?: { orderBy: Field<Row>, direction?: 'asc' | 'desc' }) 
    {
        if (params) {
            const { orderBy, direction } = params
            switch (direction) {
                case 'asc' : return this.asc(orderBy)
                case 'desc': return this.desc(orderBy)
                default    : return this.set(orderBy)
            }
        }
        else {
            this.restore()
        }
    }

    public clear()
    {
        this.backup = []
        this.sort.set({})
    }

    public define(params: { orderBy: Field<Row>, direction: 'asc' | 'desc' })
    {
        const { orderBy, direction } = params
        if (!orderBy || !direction) return
        const { identifier, callback } = parseField(orderBy)
        this.sort.set({ identifier, callback, direction })
    }

    private restore()
    {
        for (const sort of this.backup) {
            const { key, callback, direction } = sort
            const param = key as Field<Row> ?? callback
            this[direction](param)
        }
    }

    private save(sort: Sort<Row>)
    {
        this.backup = this.backup.filter(item => item.identifier !== sort.identifier )
        if (this.backup.length >= 3) {
            const [_, slot2, slot3] = this.backup
            this.backup = [slot2, slot3, sort]
        }
        else {
            this.backup = [...this.backup, sort]
        }
    }
}
