import type Context from '$lib/remote/Context'
import type { Order } from '$lib/remote'
import { type Writable, get } from 'svelte/store'


export default class SortHandler<Row>
{
    private triggerChange   : Writable<number>
    private hasMultipleSort : boolean
    private sorted          : Writable<Order<Row>[]>

    constructor(context: Context<Row>)
    {
        this.triggerChange      = context.triggerChange
        this.hasMultipleSort    = context.hasMultipleSort
        this.sorted             = context.sorted
    }

    public set(orderBy: keyof Row, direction: 'asc' | 'desc')
    {
        const sort = { orderBy, direction }
        if (this.hasMultipleSort === false) {
            this.sorted.set([ sort ])
            return
        }
        this.sorted.update((store) => {
            store = store.filter((item) => {
                return (item.orderBy !== orderBy) && item.direction
            })
            if (orderBy) {
                store.push(sort)
            }
            return store
        })
    }

    public sort(orderBy: keyof Row = null)
    {
        if (!orderBy) return
        const sorted = get(this.sorted)
        const exists = sorted.find(sort => sort.orderBy === orderBy)

        if(!exists) {
            this.sortAsc(orderBy)
        }
        else if (exists.direction === 'asc') {
            this.sortDesc(exists.orderBy)
        }
        else if (exists.direction === 'desc') {
            this.sortAsc(orderBy)
        } 
    }

    public sortAsc(orderBy: keyof Row)
    {
        if (!orderBy) return
        this.set( orderBy, 'asc' )
        this.triggerChange.update((store) => { return store + 1 })
    }

    public sortDesc(orderBy: keyof Row)
    {
        if (!orderBy) return
        this.set( orderBy, 'desc' )
        this.triggerChange.update((store) => { return store + 1 })
    }

    public applySorting(params: { orderBy: keyof Row, direction?: 'asc' | 'desc' } = null)
    {
        if (params) {
            switch (params.direction) {
                case 'asc' : return this.sortAsc(params.orderBy)
                case 'desc': return this.sortDesc(params.orderBy)
                default    : return this.sort(params.orderBy)
            }
        }
        const sorted = get(this.sorted)
        if (sorted.length > 0) {
            for (const order of sorted) {
                return this.applySorting({ orderBy: order.orderBy, direction: order.direction })
            }
        }
        return
    }
}
