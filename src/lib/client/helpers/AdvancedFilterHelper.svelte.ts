import type { Field, Check, Criterion } from '$lib/client'
import type FilterHandler from '$lib/client/handlers/FilterHandler.svelte'
import { check as comparator } from '$lib/client/Comparator'

export default class AdvancedFilterHelper<Row>
{
    public  active          = $state<(string | number | number[])[]>([])
    private filterHandler   : FilterHandler<Row>
    private criteria        : Criterion[]
    private field           : Field<Row>
    private uid             : string
    private check           : Check<any>

    constructor(filterHandler: FilterHandler<Row>, field: Field<Row>, check?: Check<any>)
    {
        this.filterHandler  = filterHandler
        this.field          = field
        this.uid            = 'm_' + (Math.random()).toString(28).substring(2)
        this.criteria       = []
        this.check          = check ?? comparator.isEqualTo
        this.cleanup()
    }

    public set(value: string | number | number[], check?: Check<any>): void
    {
        if (this.criteria.find(criterion => criterion.value === value)) {
            this.criteria = this.criteria.filter(criterion => criterion.value !== value)
        }
        else {
            this.criteria = [ { value, check: check ?? this.check }, ...this.criteria ]
        }
        if (this.criteria.length === 0) {
            return this.clear()
        }
        this.filterHandler.set(this.criteria, this.field, comparator.whereIn, this.uid)
        this.active = this.criteria.map(criterion => criterion.value)
    }

    public clear(): void
    {
        this.criteria = []
        this.active = []
        this.filterHandler.unset(this.uid)
    }

    private cleanup()
    {
        this.filterHandler.getTable().on('clearFilters', () => {
            this.clear()
        })
    }
}
