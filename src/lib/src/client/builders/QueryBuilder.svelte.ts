import type { Field, Check }    from '$lib/src/client'
import type QueryHandler        from '../handlers/QueryHandler.svelte'
import { check as comparator }  from '$lib/src/client/core'

export default class QueryBuilder<Row>
{
    public  value           = $state<unknown>('')
    private id              = Math.random().toString(36).substring(2, 15)
    private queryHandler    : QueryHandler<Row>
    private path            : string[]
    private key             : string
    private check           : Check

    constructor(queryHandler: QueryHandler<Row>, key: string)
    {
        this.queryHandler   = queryHandler
        this.key            = key
        this.cleanup()
    }

    public where(check: Check)
    {
        this.check = check
        return this
    }

    public from(path: string[])
    {
        this.path = path
        return this
    }

    public set(value?: unknown)
    {
        if (value) this.value = value
        this.queryHandler.set(this.path, this.key, this.value, this.check ?? comparator.isLike, this.id)
    }

    public clear()
    {
        this.value = ''
        this.queryHandler.unset(this.id)
    }

    private cleanup()
    {
        this.queryHandler['table'].on('clearFilters', () => this.clear())
    }
}
