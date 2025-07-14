import type TableHandler from '../TableHandler.svelte'
import type { SearchInterface } from '$lib/src/shared'

export default class SearchBuilder<Row> implements SearchInterface
{
    public  value           = $state<string>('')
    private timeout         = undefined
    private table           : TableHandler<Row>

    constructor(table: TableHandler<Row>)
    {
        this.table = table
        this.cleanup()
    }

    public set()
    {
        this.table['search'] = this.value
        clearTimeout(this.timeout)
        this.timeout = setTimeout( () => {
            this.table.setPage(1)
        }, 400)
    }

    public init(value?: string)
    {
        if (!value) return this
        this.value = value
        this.table['search'] = value
        return this
    }

    public clear()
    {
        this.value = ''
        this.table['search'] = ''
        this.table.invalidate()
    }

    private cleanup()
    {
        this.table.on('clearSearch', () => this.clear())
    }
}
