import type { Field, Check }    from '$lib/src/client'
import type FilterHandler       from '../handlers/FilterHandler.svelte'
import { check as comparator }  from '$lib/src/client/core'
import type { FilterInterface } from '$lib/src/shared'

export default class FilterBuilder<Row> implements FilterInterface
{
    public  value           = $state<unknown>('')
    private id              = Math.random().toString(36).substring(2, 15)
    private filterHandler   : FilterHandler<Row>
    private field           : Field<Row>
    private check           : Check
    private isRecursive     = true

    constructor(filterHandler: FilterHandler<Row>, field: Field<Row>, check?: Check)
    {
        this.filterHandler  = filterHandler
        this.field          = field
        this.check          = check ?? comparator.isLike
        this.cleanup()
    }

    public set(check?: Check)
    {
        this.filterHandler.set(this.value, this.field, check ?? this.check, this.id, this.isRecursive)
    }

    public init(value?: unknown)
    {
        this.value = value
        this.set()
        return this
    }

    public isNotRecursive()
    {
        this.isRecursive = false
        return this
    }

    public clear()
    {
        this.value = ''
        this.filterHandler.unset(this.id)
    }

    private cleanup()
    {
        this.filterHandler['table'].on('clearFilters', () => this.clear())
    }
}
