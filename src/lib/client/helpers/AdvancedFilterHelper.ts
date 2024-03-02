import type { Field, Comparator, Criterion } from '$lib/client'
import type FilterHandler from '$lib/client/handlers/FilterHandler'
import { type Writable, writable } from 'svelte/store'
import { check } from '$lib/client/Comparator'

export default class AdvancedFilterHelper<Row>
{
    private filterHandler   : FilterHandler<Row>
    private criteria        : Criterion[]
    private filterBy        : Field<Row>
    private active          : Writable<(string | number | [min: number, max: number])[]>
    private comparator      : Comparator<any>

    constructor(filterHandler: FilterHandler<Row>, filterBy: Field<Row>, comparator?: Comparator<any>)
    {
        this.filterHandler  = filterHandler
        this.filterBy       = filterBy
        this.criteria       = []
        this.comparator     = comparator ?? check.isEqualTo
        this.active         = writable([])
    }

    public set(value: string | number | [min: number, max: number], comparator?: Comparator<any>): void
    {
        if (this.criteria.find(criterion => criterion.value === value)) {
            this.criteria = this.criteria.filter(criterion => criterion.value !== value)
        }
        else {
            this.criteria = [ { value, comparator: comparator ?? this.comparator }, ...this.criteria ]
        }
        if (this.criteria.length === 0) {
            return this.clear()
        }
        this.filterHandler.set(this.criteria, this.filterBy, check.whereIn)
        this.active.set(this.criteria.map(criterion => criterion.value))
    }

    public get(): Writable<(string | number | [min: number, max: number])[]>
    {
        return this.active
    }

    public clear(): void
    {
        this.criteria = []
        this.active.set([])
        this.filterHandler.set(undefined, this.filterBy, check.whereIn)
    }

    /**
     * @deprecated use get() instead
     */
    public getSelected()
    {
        return this.get()
    }
}
