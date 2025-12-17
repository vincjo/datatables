import type { Field, Check, Criterion } from '$lib/src/client'
import type FilterHandler               from '$lib/src/client/handlers/FilterHandler.svelte'
import { check as comparator }          from '$lib/src/client/core'

export default class AdvancedFilterBuilder<Row>
{
    public  criteria        = $state<unknown[]>([])
    private id              = Math.random().toString(36).substring(2, 15)
    private filterHandler   : FilterHandler<Row>
    private collection      : Criterion[]
    private field           : Field<Row>
    private check           : Check
    private isRecursive     = true

    constructor(filterHandler: FilterHandler<Row>, field: Field<Row>, check?: Check)
    {
        this.filterHandler  = filterHandler
        this.field          = field
        this.collection     = []
        this.check          = check ?? comparator.isEqualTo
        this.cleanup()
    }

    public set(value: unknown, check?: Check): void
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
        this.filterHandler.set(this.collection, this.field, comparator.whereIn, this.id, this.isRecursive)
        this.criteria = this.collection.map(criterion => criterion.value)
    }

    public isNotRecursive()
    {
        this.isRecursive = false
        return this
    }

    public clear(): void
    {
        this.collection = []
        this.criteria = []
        this.filterHandler.unset(this.id)
    }

    private cleanup()
    {
        this.filterHandler['table'].on('clearFilters', () => this.clear())
    }
}
