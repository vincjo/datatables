import type { Field, Check, TableHandler } from '$lib/src/client'
import { isNotNull, parseField } from '../utils'
import type { UUID } from 'crypto'


export default class FilterHandler<Row>
{
    private table: TableHandler<Row>

    constructor(table: TableHandler<Row>)
    {
        this.table = table
    }

    public set(value: unknown, field: Field<Row>, check: Check = null, uuid: UUID)
    {
        this.table.setPage(1)

        const { callback, id, key } = parseField(field, uuid)
        const filter = { value, id, callback, check, key }

        this.table.filters = this.table.filters.filter(filter => filter.id !== id)
        if (isNotNull(value)) {
            this.table.filters.push(filter)
        }
    }

    public unset(id: UUID)
    {
        this.table.setPage(1)
        this.table.filters = this.table.filters.filter(filter => filter.id !== id)
    }
}
