import type Context             from '$lib/remote/Context'
import type { Sort }            from '$lib/remote'
import { type Writable, get }   from 'svelte/store'
import type EventHandler        from './EventHandler'

export default class SortHandler<Row>
{
    private event : EventHandler
    private sort  : Writable<Sort<Row>>

    constructor(context: Context<Row>)
    {
        this.event = context.event
        this.sort  = context.sort
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
            const { orderBy, direction } = params
            switch (direction) {
                case 'asc' : return this.asc(orderBy)
                case 'desc': return this.desc(orderBy)
                default    : return this.set(orderBy)
            }
        }
        const sort = get(this.sort)
        if (sort) {
            return this.apply({ orderBy: sort.orderBy, direction: sort.direction })
        }
        return
    }

    public define(params: { orderBy: keyof Row, direction: 'asc' | 'desc' })
    {
        const { orderBy, direction } = params
        if (!orderBy || !direction) return
        this.sort.set({ orderBy, direction })
    }

    public clear()
    {
        this.sort.set({})
    }
}
