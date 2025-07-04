import type TableHandler from '../TableHandler.svelte'

export default class SearchBuilder<Row>
{
    public  value           = $state<string>('')
    private timeout         = undefined
    private table           : TableHandler<Row>

    constructor(table: TableHandler<Row>, value?: string)
    {
        this.table = table
        if (value) {
            this.value = value
            this.table['search'] = value
        }
        this.cleanup()
    }

    public set(invalidate: boolean = true)
    {
        this.table['search'] = this.value
        if (!invalidate) return
        clearTimeout(this.timeout)
        this.timeout = setTimeout( () => {
            this.table.setPage(1)
        }, 400)
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
