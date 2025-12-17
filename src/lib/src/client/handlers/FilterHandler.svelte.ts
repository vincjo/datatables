import type { Field, Check, TableHandler }  from '$lib/src/client'
import { isNotNull, parse }                 from '$lib/src/client/core'


export default class FilterHandler<Row>
{
    private table: TableHandler<Row>

    constructor(table: TableHandler<Row>)
    {
        this.table = table
    }

    public set(value: unknown, field: Field<Row>, check: Check = null, id: string, isRecursive = true)
    {
        this.table.setPage(1)

        const { callback, key } = parse<Row>(field, id)
        const filter = { value, id, callback, check, key, isRecursive }

        this.table.filters = this.table.filters.filter(filter => filter.id !== id)
        if (isNotNull(value)) {
            this.table.filters.push(filter)
        }
    }

    public unset(id: string)
    {
        this.table.setPage(1)
        this.table.filters = this.table.filters.filter(filter => filter.id !== id)
    }
}
