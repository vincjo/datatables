import type { TableHandler } from '$lib/src/server'

export default class FilterHandler<Row>
{
    private table: TableHandler<Row>

    constructor(table: TableHandler<Row>) 
    {
        this.table = table
    }

    public set(value: string | number, field: keyof Row)
    {
        this.table.filters = this.table.filters.filter(filter =>  filter.field !== field && filter.value)
        if (value) {
            this.table.filters.push({ value, field })
        }
    }

    public unset(field: keyof Row)
    {
        this.table.filters = this.table.filters.filter(filter => filter.field !== field)
    }

    public clear()
    {
        this.table.filters = []
        this.table['event'].dispatch('clearFilters')
    }
}
