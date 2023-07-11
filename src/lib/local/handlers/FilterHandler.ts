import type { Filter, FilterBy, Comparator } from '$lib/local'
import type Context from '$lib/local/Context'
import type EventHandler from './EventHandler'
import type { Writable } from 'svelte/store'

export default class FilterHandler<Row>
{
    private filters: Writable<Filter<Row>[]>
    private event: EventHandler

    constructor(context: Context<Row>)
    {
        this.filters    = context.filters
        this.event      = context.event
    }

    public set(value: string | number, filterBy: FilterBy<Row>, comparator: Comparator<Row> = null )
    {
        const parsed = this.parse(filterBy)
        this.filters.update((store) => {
            const filter = {
                filterBy: parsed.fn,
                value: value,
                identifier: parsed.identifier,
                check: comparator
            }
            store = store.filter((item) => item.identifier !== parsed.identifier && item.value )
            if (value) {
                store.push(filter)
            }
            return store
        })
    }

    public remove()
    {
        this.filters.set([])
        this.event.trigger('change')
        this.event.trigger('clearFilters')
    }

    private parse(filterBy: FilterBy<Row>)
    {
        if (typeof filterBy === 'string') {
            return {
                fn: (row: Row) => row[filterBy],
                identifier: filterBy.toString()
            }
        } else if (typeof filterBy === 'function') {
            return {
                fn: filterBy,
                identifier: filterBy.toString()
            }
        }
        throw new Error(`Invalid filterBy argument: ${String(filterBy)}`)
    }
}
