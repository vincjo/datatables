import type { Filter } from '$lib/legacy/remote'
import type Context from '$lib/legacy/remote/Context'
import type { Writable } from 'svelte/store'

export default class FilterHandler<Row>
{
    public filters: Writable<Filter<Row>[]>

    constructor(context: Context<Row>) 
    {
        this.filters = context.filters
    }

    public set(value: string | number, filterBy: keyof Row )
    {
        const filter = { filterBy, value }
        this.filters.update((store) => {
            store = store.filter((item) => {
                return (item.filterBy !== filterBy) && item.value
            })
            if (value) {
                store.push(filter)
            }
            return store
        })
    }

    public remove()
    {
        this.filters.set([])
    }
}
