import type { Filter, Field, Comparator, Criterion } from '$lib/local'
import type Context from '$lib/local/Context'
import type EventHandler from '$lib/local/handlers/EventHandler'
import { type Writable, writable } from 'svelte/store'
import { check } from '$lib/local/Comparator'
import { parseField } from '$lib/local/utils'

export default class AdvancedFilterHandler<Row>
{
    private filters: Writable<Filter<Row>[]>
    private event: EventHandler
    private criteria: Criterion[]
    private filterBy: Field<Row>
    private selected: Writable<(string | number | [min: number, max: number])[]>

    constructor(context: Context<Row>, filterBy: Field<Row>)
    {
        this.filterBy   = filterBy
        this.criteria   = []
        this.selected   = writable([])
        this.filters    = context.filters
        this.event      = context.event
    }

    public set(value: string | number | [min: number, max: number], comparator: Comparator<any> = check.contains)
    {
        if (this.criteria.find(criterion => criterion.value === value)) {
            this.criteria = this.criteria.filter(criterion => criterion.value !== value)
        }
        else {
            this.criteria = [ { value, comparator }, ...this.criteria ]
        }
        this.update()
        this.event.trigger('change')
        this.selected.set(this.criteria.map(criterion => criterion.value))
    }

    private update()
    {
        const { callback, identifier } = parseField(this.filterBy)
        const filter = {
            value: this.criteria, 
            comparator: check.whereIn,
            identifier,
            callback,
        }
        this.filters.update((store) => {
            store = store.filter((item) => item.identifier !== identifier && this.criteria.length > 0 )
            if (this.criteria.length > 0) {
                store.push(filter)
            }
            return store
        })
    }

    public getSelected()
    {
        return this.selected
    }

    public clear()
    {
        this.criteria = []
        this.selected.set([])
        this.update()
        this.event.trigger('change')
    }
}
