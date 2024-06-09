import type { TableHandler } from '$lib/remote'

export default class FilterHandler<Row>
{
    private table: TableHandler<Row>

    constructor(table: TableHandler<Row>) 
    {
        this.table = table
    }

    public set(value: string | number, field: string )
    {
        this.table.filters.filter(filter =>  filter.field !== field && filter.value)
        if (value) {
            this.table.filters.push({ value, field })
        }
    }

    public clear()
    {
        this.table.filters = []
        this.table.events.trigger('clearFilters')
    }
}
