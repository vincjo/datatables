import type Context from '../Context'
import type { Writable } from 'svelte/store'

export type Sorted = { 
    fn?: Function, 
    identifier: string | null, 
    direction: 'asc' | 'desc' | null, 
    locales?: string, 
    options?: Object 
}
export type SortingParams = { locales?: string, options?: Object }


export default class Rows
{
    private rawRows: Writable<any[]>
    private triggerChange: Writable<number>
    private  sorted: Writable<Sorted>

    constructor(context: Context)
    {
        this.rawRows = context.rawRows
        this.triggerChange = context.triggerChange
        this.sorted = context.sorted
    }

    public sort(orderBy: Function | string): void
    {
        if (!orderBy) return
        const sorted = this.getSorted()
        const parsed = this.parse(orderBy)

        if (sorted.identifier !== parsed.identifier) {
            this.sorted.update( store => store.direction = null )
        }
        if (sorted.direction === null || sorted.direction === 'desc') {
            this.sortAsc(orderBy)
        }
        else if (sorted.direction === 'asc') {
            this.sortDesc(orderBy)
        }
    }

    public sortAsc(orderBy: Function | string): void
    {
        if (!orderBy) return
        const parsed = this.parse(orderBy)
        this.sorted.set({ identifier: parsed.identifier, direction: 'asc', fn: parsed.fn })
        this.rawRows.update(store => {
            try {
                store.sort( (a, b) => {
                    if ( typeof(parsed.fn(b) ) === "boolean" ) {
                        return parsed.fn(a) ? -1 : 1
                    } 
                    else if (!parsed.fn(b)) return 1
                    else if (!parsed.fn(a)) return -1
                    else {
                        return parsed.fn(a).localeCompare(parsed.fn(b))
                    }
                })
                return store
            } catch (e) {
                return store.sort( (a, b) => parseFloat(parsed.fn(a)) - parseFloat(parsed.fn(b)))
            }
        })
        this.triggerChange.update( store => { return store + 1 })
    }

    public sortDesc(orderBy: Function | string): void
    {
        if (!orderBy) return
        const parsed = this.parse(orderBy)
        this.sorted.set({ identifier: parsed.identifier, direction: 'desc', fn: parsed.fn })
        this.rawRows.update(store => {
            try {
                store.sort( (a, b) => {
                    if ( typeof( parsed.fn(b) ) === "boolean" ) {
                        return parsed.fn(a) ? 1 : -1
                    }
                    else if (!parsed.fn(a)) return 1
                    else if (!parsed.fn(b)) return -1
                    else {
                        return parsed.fn(b).localeCompare(parsed.fn(a))
                    }
                })
                return store
            } catch (e) {
                return store.sort( (a, b) => parseFloat(parsed.fn(b)) - parseFloat(parsed.fn(a)))
            }
        })
        this.triggerChange.update( store => { return store + 1 })
    }

    public applySorting(params: { orderBy: Function | string, direction?: 'asc' | 'desc' | null } | null = null)
    {
        if (params) {
            switch(params.direction) {
                case 'asc': return this.sortAsc(params.orderBy )
                case 'desc': return this.sortDesc(params.orderBy)
                default: return this.sort(params.orderBy)
            }
        }
        const sorted = this.getSorted()
        if (sorted.identifier) {
            return this.applySorting({
                orderBy: sorted.fn,
                direction: sorted.direction
            })
        }
        return
    }

    private parse(orderBy: Function | string): { fn: Function, identifier: string }
    {
        if (typeof (orderBy) === 'string') {
            return {
                fn: (row:any) => row[orderBy],
                identifier: orderBy.toString()
            }
        }
        return {
            fn: orderBy,
            identifier: orderBy.toString()
        }
    }

    private getSorted(): Sorted
    {
        let $sorted: Sorted
        this.sorted.subscribe( store => $sorted = store )
        return $sorted
    }
}