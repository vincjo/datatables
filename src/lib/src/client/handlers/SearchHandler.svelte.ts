import { type TableHandler, type Field, check } from '$lib/src/client'

export default class SearchHandler<Row>
{
    private table: TableHandler<Row>

    constructor(table: TableHandler<Row>)
    {
        this.table = table
    }

    public set(value: string, scope?: Field<Row>[])
    {
        this.table.setPage(1)
        this.table['search'] = { value: value, scope: scope }
    }

    public regex(pattern: string, scope?: Field<Row>[])
    {
        this.table.setPage(1)
        this.table['search'] = { value: pattern, scope: scope, check: check.match }
    }

    public clear()
    {
        this.table.setPage(1)
        this.table['search'] = { value: '' }
    }
}