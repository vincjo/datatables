import type { Filter, Field, Comparator, EventsHandler, Criterion } from '$lib/client'
import { isNotNull } from '../utils'
import type Context from '$lib/client/Context'
import { type Writable, type Readable, derived } from 'svelte/store'
import { parseField } from '$lib/client/utils'

type Value = string | number | null | undefined | boolean | Criterion[]


export default class FilterHandler<Row>
{
    private filters     : Writable<Filter<Row>[]>
    private events      : EventsHandler
    private collection  : Readable<{ value: unknown, filterBy: Field<Row>, check: string }[]>

    constructor(context: Context<Row>)
    {
        this.filters = context.filters
        this.events  = context.events
    }

    public set(value: Value, filterBy: Field<Row>, comparator: Comparator<Row> = null )
    {
        const { callback, identifier, key } = parseField(filterBy)
        const filter = { value, identifier, callback, comparator, key }
        this.filters.update((store) => {
            store = store.filter((item) => item.identifier !== identifier)
            if (isNotNull(value)) {
                store.push(filter)
            }
            return store
        })
    }

    public clear()
    {
        this.filters.set([])
        this.events.trigger('change')
        this.events.trigger('clearFilters')
    }

    public get()
    {
        if (this.collection) {
            return this.collection
        }
        this.collection = this.createCollection()
        return this.collection
    }

    private createCollection()
    {
        return derived(this.filters, ($filters) => {
            return $filters.map( ({ value, callback, key, comparator }) => {
                const filterBy = key as Field<Row> ?? callback
                return { 
                    value, 
                    filterBy,
                    check: comparator ? comparator.name : 'isLike'
                    // set: (value: Value, comparator: Comparator<Row> = check.isLike) => {
                    //     this.set(value, filterBy, comparator)
                    // },
                    // clear: () => {
                    //     this.set(undefined, filterBy)
                    // }
                }
            })
        })
    }

}
