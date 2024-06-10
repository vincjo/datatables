import type { Field, Check, Criterion } from '$lib/client'
import type FilterHandler from '$lib/client/handlers/FilterHandler.svelte'
import { check as comparator } from '$lib/client/Comparator'

export default class AdvancedFilterHelper<Row>
{
    public  criteria        = $state<(string | number | number[])[]>([])
    private filterHandler   : FilterHandler<Row>
    private collection      : Criterion[]
    private field           : Field<Row>
    private uid             : string
    private check           : Check<any>

    constructor(filterHandler: FilterHandler<Row>, field: Field<Row>, check?: Check<any>)
    {
        this.filterHandler  = filterHandler
        this.field          = field
        this.uid            = 'm_' + (Math.random()).toString(28).substring(2)
        this.collection     = []
        this.check          = check ?? comparator.isEqualTo
        this.cleanup()
    }

    public set(value: string | number | number[], check?: Check<any>): void
    {
        if (this.collection.find(criterion => criterion.value === value)) {
            this.collection = this.collection.filter(criterion => criterion.value !== value)
        }
        else {
            this.collection = [ { value, check: check ?? this.check }, ...this.collection ]
        }
        if (this.collection.length === 0) {
            return this.clear()
        }
        this.filterHandler.set(this.collection, this.field, comparator.whereIn, this.uid)
        this.criteria = this.collection.map(criterion => criterion.value)
    }

    public clear(): void
    {
        this.collection = []
        this.criteria = []
        this.filterHandler.unset(this.uid)
    }

    private cleanup()
    {
        this.filterHandler['table'].on('clearFilters', () => {
            this.clear()
        })
    }
}
