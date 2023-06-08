<<<<<<< HEAD
import type { Filter, FilterBy } from '../Context'
import type Context from '../Context'
import type { Writable } from 'svelte/store'

export default class Filters<T> {
    public filters: Writable<Filter<T>[]>

    constructor(context: Context<T>) {
        this.filters = context.filters
    }

    public set(
        value: string | number,
        filterBy: FilterBy<T>,
        comparator: (args: any) => any = null
    ): void {
=======
import type { Filter, FilterBy, Comparator } from '$lib/core'
import type Context from '$lib/core/Context'
import type { Writable } from 'svelte/store'

export default class Filters<Row>
{
    public filters: Writable<Filter<Row>[]>

    constructor(context: Context<Row>) 
    {
        this.filters = context.filters
    }

    public set(value: string | number, filterBy: FilterBy<Row>, comparator: Comparator<Row> = null )
    {
>>>>>>> upstream/master
        const parsed = this.parse(filterBy)
        this.filters.update((store) => {
            const filter = {
                filterBy: parsed.fn,
                value: value,
                identifier: parsed.identifier,
<<<<<<< HEAD
                compare: comparator
=======
                check: comparator
>>>>>>> upstream/master
            }
            store = store.filter((item) => {
                return item.identifier !== parsed.identifier && item.value
            })
            store.push(filter)
            return store
        })
    }

<<<<<<< HEAD
    public remove(): void {
=======
    public remove()
    {
>>>>>>> upstream/master
        this.filters.set([])
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
<<<<<<< HEAD

        throw new Error('Invalid filterBy argument')
=======
        throw new Error(`Invalid filterBy argument: ${String(filterBy)}`)
>>>>>>> upstream/master
    }
}
