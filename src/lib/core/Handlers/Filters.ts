import type { Filter, FilterBy, Comparator } from '$lib'
import type Context from '../Context'
import type { Writable } from 'svelte/store'

export default class Filters<T>
{
    public filters: Writable<Filter<T>[]>

    constructor(context: Context<T>) 
    {
        this.filters = context.filters
    }

    public set(value: string | number, filterBy: FilterBy<T>, comparator: Comparator<T> = null )
    {
        const parsed = this.parse(filterBy)
        this.filters.update((store) => {
            const filter = {
                filterBy: parsed.fn,
                value: value,
                identifier: parsed.identifier,
                check: comparator
            }
            store = store.filter((item) => {
                return item.identifier !== parsed.identifier && item.value
            })
            store.push(filter)
            return store
        })
    }

    public remove()
    {
        this.filters.set([])
    }

    private parse(filterBy: FilterBy<T>) 
    {
        if (typeof filterBy === 'string') {
            return {
                fn: (row: T) => row[filterBy],
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
