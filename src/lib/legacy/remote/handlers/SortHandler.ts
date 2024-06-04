import type Context from '$lib/legacy/remote/Context'
import type { Order } from '$lib/legacy/remote'
import { type Writable, get } from 'svelte/store'
import type EventHandler from './EventHandler'

export default class SortHandler<Row>
{
    private event           : EventHandler
    private hasMultipleSort : boolean
    private sort            : Writable<Order<Row>>

    constructor(context: Context<Row>)
    {
        this.event              = context.event
        this.hasMultipleSort    = false
        this.sort               = context.sort
    }

    public set(orderBy: keyof Row = null)
    {
        if (!orderBy) return
        const sort = get(this.sort)

        if(!sort || sort.orderBy !== orderBy) {
            this.asc(orderBy)
        }
        else if (sort.direction === 'asc') {
            this.desc(sort.orderBy)
        }
        else if (sort.direction === 'desc') {
            this.asc(orderBy)
        } 
    }

    public asc(orderBy: keyof Row)
    {
        if (!orderBy) return
        this.sort.set({ orderBy, direction: 'asc' })
        this.event.trigger('change')
    }

    public desc(orderBy: keyof Row)
    {
        if (!orderBy) return
        this.sort.set({ orderBy, direction: 'desc' })
        this.event.trigger('change')
    }

    public apply(params: { orderBy: keyof Row, direction?: 'asc' | 'desc' } = null)
    {
        if (params) {
            switch (params.direction) {
                case 'asc' : return this.asc(params.orderBy)
                case 'desc': return this.desc(params.orderBy)
                default    : return this.set(params.orderBy)
            }
        }
        const sort = get(this.sort)
        if (sort) {
            return this.apply({ orderBy: sort.orderBy, direction: sort.direction })
        }
        return
    }


    // public set(orderBy: keyof Row, direction: 'asc' | 'desc')
    // {
    //     const sort = { orderBy, direction }
    //     if (this.hasMultipleSort === false) {
    //         this.sort.set([ sort ])
    //         return
    //     }
    //     this.sort.update((store) => {
    //         store = store.filter((item) => {
    //             return (item.orderBy !== orderBy) && item.direction
    //         })
    //         if (orderBy) {
    //             store.push(sort)
    //         }
    //         return store
    //     })
    // }

    // public sort(orderBy: keyof Row = null)
    // {
    //     if (!orderBy) return
    //     const sort = get(this.sort)
    //     const exists = sort.find(sort => sort.orderBy === orderBy)

    //     if(!exists) {
    //         this.sortAsc(orderBy)
    //     }
    //     else if (exists.direction === 'asc') {
    //         this.sortDesc(exists.orderBy)
    //     }
    //     else if (exists.direction === 'desc') {
    //         this.sortAsc(orderBy)
    //     } 
    // }

    // public sortAsc(orderBy: keyof Row)
    // {
    //     if (!orderBy) return
    //     this.set( orderBy, 'asc' )
    //     this.triggerChange.update((store) => { return store + 1 })
    // }

    // public sortDesc(orderBy: keyof Row)
    // {
    //     if (!orderBy) return
    //     this.set( orderBy, 'desc' )
    //     this.triggerChange.update((store) => { return store + 1 })
    // }

    // public applySorting(params: { orderBy: keyof Row, direction?: 'asc' | 'desc' } = null)
    // {
    //     if (params) {
    //         switch (params.direction) {
    //             case 'asc' : return this.sortAsc(params.orderBy)
    //             case 'desc': return this.sortDesc(params.orderBy)
    //             default    : return this.sort(params.orderBy)
    //         }
    //     }
    //     const sort = get(this.sort)
    //     if (sort.length > 0) {
    //         for (const order of sort) {
    //             return this.applySorting({ orderBy: order.orderBy, direction: order.direction })
    //         }
    //     }
    //     return
    // }
}
