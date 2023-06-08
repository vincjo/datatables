import type Context from '$lib/remote/Context'
import type { Order } from '$lib/remote'
import { type Writable, get } from 'svelte/store'



export default class SortHandler<Row> 
{
    private triggerChange   : Writable<number>
    private sorted          : Writable<(Order<Row>)>

    constructor(context: Context<Row>) 
    {
        this.triggerChange  = context.triggerChange
        this.sorted         = context.sorted
    }

    public sort(orderBy: keyof Row = null)
    {
        if (!orderBy) return
        const sorted = get(this.sorted)

        if (sorted.orderBy !== orderBy) {
            this.sorted.update((store) => (store.direction = null))
        }
        if (sorted.direction === null || sorted.direction === 'desc') {
            this.sortAsc(orderBy)
        } 
        else if (sorted.direction === 'asc') {
            this.sortDesc(orderBy)
        }
    }

    public sortAsc(orderBy: keyof Row)
    {
        if (!orderBy) return
        this.sorted.set({ orderBy, direction: 'asc' })
        this.triggerChange.update((store) => { return store + 1 })
    }

    public sortDesc(orderBy: keyof Row)
    {
        if (!orderBy) return
        this.sorted.set({ orderBy, direction: 'desc' })
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
        if (sorted.orderBy) {
            return this.applySorting({
                orderBy: sorted.orderBy,
                direction: sorted.direction
            })
        }
        return
    }
}
