import type { Field, Check, TableHandler }  from '$lib/src/client'
import { isNotNull } from '$lib/src/client/core'


export default class QueryHandler<Row>
{
    private table: TableHandler<Row>

    constructor(table: TableHandler<Row>)
    {
        this.table = table
    }

    public set(path: string[], value: unknown, check: Check, id: string)
    {
        this.table.setPage(1)
        this.table.queries = this.table.queries.filter(query => query.id !== id)
        this.table.queries.push({ path, value, check, id })
    }

    public unset(id: string)
    {
        this.table.setPage(1)
        this.table.queries = this.table.queries.filter(query => query.id !== id)
    }
}
