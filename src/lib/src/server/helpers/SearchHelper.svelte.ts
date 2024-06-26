import type TableHandler from '../TableHandler.svelte'

export default class SearchHelper<Row>
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
            this.table.invalidate()
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
