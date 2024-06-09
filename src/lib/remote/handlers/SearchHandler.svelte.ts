import type { TableHandler } from '$lib/remote'

export default class SearchHandler<Row> 
{
    private table: TableHandler<Row>

    constructor(table: TableHandler<Row>) {
        this.table = table
    }

    public clear()
    {
        this.table.events.trigger('clearSearch')
    }
}
