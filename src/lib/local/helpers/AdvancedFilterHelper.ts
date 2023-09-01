import type { Field, Comparator, Criterion } from '$lib/local'
import type FilterHandler from '$lib/local/handlers/FilterHandler'
import { type Writable, writable } from 'svelte/store'
import { check } from '$lib/local/Comparator'

type Value = string | number | [min: number, max: number]

export default class AdvancedFilterHandler<Row>
{
    private filterHandler   : FilterHandler<Row>
    private criteria        : Criterion[]
    private filterBy        : Field<Row>
    private selected        : Writable<Value[]>

    constructor(filterHandler: FilterHandler<Row>, filterBy: Field<Row>)
    {
        this.filterHandler  = filterHandler
        this.filterBy       = filterBy
        this.criteria       = []
        this.selected       = writable([])
    }

    public set(value: Value, comparator: Comparator<any> = check.contains)
    {
        if (this.criteria.find(criterion => criterion.value === value)) {
            this.criteria = this.criteria.filter(criterion => criterion.value !== value)
        }
        else {
            this.criteria = [ { value, comparator }, ...this.criteria ]
        }
        if (this.criteria.length === 0) {
            return this.clear()
        }
        this.filterHandler.set(this.criteria, this.filterBy, check.whereIn)
        this.selected.set(this.criteria.map(criterion => criterion.value))
    }

    public getSelected()
    {
        return this.selected
    }

    public clear()
    {
        this.criteria = []
        this.selected.set([])
        this.filterHandler.set(undefined, this.filterBy, check.whereIn)
    }
}
