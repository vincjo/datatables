import type { Field } from '$lib/src/client'
import type TableHandler from '../TableHandler.svelte'

export default class SearchHelper<Row>
{
    public  value           = $state<string>('')
    public  scope           = $state<Field<Row>[]>([])
    private table           : TableHandler<Row>

    constructor(table: TableHandler<Row>, scope: Field<Row>[])
    {
        this.table                  = table
        this.table['searchScope']   = scope
        this.cleanup()
    }

    public set()
    {
        this.table['search'] = this.value
    }

    public clear()
    {
        this.value = ''
        this.table['search'] = ''
    }

    private cleanup()
    {
        this.table.on('clearSearch', () => this.clear())
    }
}
