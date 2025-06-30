import type { Check }    from '$lib/src/client'
import type QueryHandler        from '../handlers/QueryHandler.svelte'

export default class QueryBuilder<Row>
{
    public  value           = $state<unknown>('')
    private id              = Math.random().toString(36).substring(2, 15)
    private queryHandler    : QueryHandler<Row>
    private path            : string[] = []
    private check           : Check

    constructor(queryHandler: QueryHandler<Row>)
    {
        this.queryHandler   = queryHandler
        this.cleanup()
    }

    public from(path: string[])
    {
        this.path = path
        return this
    }

    public where(filter: (row: any, value?: unknown) => boolean)
    {
        this.check = filter
        return this
    }

 

    public set(value?: unknown)
    {
        if (value) this.value = value
        this.queryHandler.set(this.path, this.value, this.check, this.id)
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
