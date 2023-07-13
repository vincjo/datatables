import type { Filter, FilterBy, Comparator } from '$lib/local'
import { isNotNull } from '../utils'
import type Context from '$lib/local/Context'
import type EventHandler from './EventHandler'
import { type Writable, get } from 'svelte/store'

export default class FilterHandler<Row>
{
    private filters: Writable<Filter<Row>[]>
    private rawRows: Writable<Row[]>
    private event: EventHandler

    constructor(context: Context<Row>)
    {
        this.filters    = context.filters
        this.rawRows    = context.rawRows
        this.event      = context.event
    }

    public set(value: string | number | null | undefined | boolean, filterBy: FilterBy<Row>, comparator: Comparator<Row> = null )
    {
        const parsed = this.parse(filterBy)
        this.filters.update((store) => {
            const filter = {
                filterBy: parsed.fn,
                value: value,
                identifier: parsed.identifier,
                check: comparator
            }
            store = store.filter((item) => item.identifier !== parsed.identifier && (isNotNull(value)) )
            if (isNotNull(value)) {
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

    public distinct(filterBy: string)
    {
        const rows = get(this.rawRows)
        return [... new Set(rows.map(key => key[filterBy]))]
    }
}
