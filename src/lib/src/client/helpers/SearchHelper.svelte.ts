import type { Field }       from '$lib/src/client'
import type TableHandler    from '../TableHandler.svelte'
import { check }            from '$lib/src/client'
import { parseField }       from '../utils'

export default class SearchHelper<Row>
{
    public  value           = $state<string>('')
    public  scope           = $state<Field<Row>[]>([])
    public  uid             : string
    private table           : TableHandler<Row>

    constructor(table: TableHandler<Row>, scope: Field<Row>[])
    {
        this.table                  = table
        this.table['searchScope']   = scope
        this.uid                    = 'm_' + (Math.random()).toString(28).substring(2)
        this.cleanup()
    }

    public set()
    {
        this.table['search'] = this.value
    }

    public regex()
    {
        if (!this.value) {
            return this.table['filterHandler'].unset(this.uid)
        }
        // if (this.table['searchScope']) {
        //     const fields = this.table['searchScope'].map(field => parseField(field))
        // }
        this.table['filterHandler'].set(this.value, (row) => row, check.match, this.uid)
    }

    public clear()
    {
        this.value = ''
        this.table['search'] = ''
        this.table['filterHandler'].unset(this.uid)
    }

    private cleanup()
    {
        this.table.on('clearSearch', () => this.clear())
    }
}
