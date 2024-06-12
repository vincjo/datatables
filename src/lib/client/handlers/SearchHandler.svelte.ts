import type { TableHandler, Field } from '$lib/client'

export default class SearchHandler<Row> 
{
    private table : TableHandler<Row>

    constructor(table: TableHandler<Row>) 
    {
        this.table = table
    }

    public set(value: string, scope: Field<Row>[] = null)
    {
        this.table['search'] = value ?? ''
        this.table['searchScope'] = scope ?? null
    }

    public clear()
    {
        this.table['search'] = ''
        this.table['events'].trigger('change')
        this.table['events'].trigger('clearSearch')
    }
}
