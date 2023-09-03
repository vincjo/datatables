import type { Filter, Field, Comparator, EventHandler, Criterion } from '$lib/local'
import { isNotNull } from '../utils'
import type Context from '$lib/local/Context'
import { type Writable, type Readable, derived } from 'svelte/store'
import { parseField } from '$lib/local/utils'
// import { check } from '$lib/local/Comparator'

type Value = string | number | null | undefined | boolean | Criterion[]
// type Collection<Row> = {
//     value: unknown
//     filterBy: Field<Row>
//     set: (value: unknown, comparator: Comparator<Row>) => void,
//     clear: () => void
// }


export default class FilterHandler<Row>
{
    protected filters: Writable<Filter<Row>[]>
    protected event: EventHandler
    private collection: Readable<{ value: unknown, filterBy: Field<Row>, check: string }[]>

    constructor(context: Context<Row>)
    {
        this.filters = context.filters
        this.event   = context.event
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
        this.event.trigger('change')
        this.event.trigger('clearFilters')
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
                    check: comparator ? comparator.name : 'contains'
                    // set: (value: Value, comparator: Comparator<Row> = check.contains) => {
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
