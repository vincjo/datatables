import type { Field, Check, Criterion } from '$lib/src/client'
import type FilterHandler               from '$lib/src/client/handlers/FilterHandler.svelte'
import { check as comparator }          from '$lib/src/client/Comparator'

export default class AdvancedFilterHelper<Row>
{
    public  criteria        = $state<(string | number | number[])[]>([])
    private uid             = crypto.randomUUID()
    private filterHandler   : FilterHandler<Row>
    private collection      : Criterion[]
    private field           : Field<Row>
    private check           : Check

    constructor(filterHandler: FilterHandler<Row>, field: Field<Row>, check?: Check)
    {
        this.filterHandler  = filterHandler
        this.field          = field
        this.collection     = []
        this.check          = check ?? comparator.isEqualTo
        this.cleanup()
    }

    public set(value: string | number | number[], check?: Check): void
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
        this.filterHandler['table'].on('clearFilters', () => this.clear())
    }
}
