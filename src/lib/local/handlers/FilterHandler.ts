import type { Filter, Field, Comparator, EventHandler } from '$lib/local'
import { isNotNull } from '../utils'
import type Context from '$lib/local/Context'
import { type Writable, derived } from 'svelte/store'
import { parseField } from '$lib/local/utils'

type Value = string | number | null | undefined | boolean

export default class FilterHandler<Row>
{
    protected filters: Writable<Filter<Row>[]>
    protected event: EventHandler

    constructor(context: Context<Row>)
    {
        this.filters = context.filters
        this.event   = context.event
    }

    public set(value: Value, filterBy: Field<Row>, comparator: Comparator<Row> = null )
    {
        const { callback, identifier } = parseField(filterBy)
        const filter = { value, identifier, callback, comparator }
        this.filters.update((store) => {
            store = store.filter((item) => item.identifier !== identifier && (isNotNull(value)) )
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
        return derived(this.filters, ($filters) => {
            return $filters.map( ({ value, identifier, callback }) => {
                const field = identifier.includes('=>') ? callback : identifier as Field<Row>
                return { 
                    value, 
                    identifier,
                    set: (value: Value) => {
                        this.set(value, field)
                    },
                    clear: () => {
                        this.set(undefined, field)
                    }
                }
            })
        })
    }


}
