import type { Field, Check, Criterion } from '$lib/src/client'
import { isNotNull } from '../utils'
import type { TableHandler } from '$lib/src/client'
import { parseField } from '$lib/src/client/utils'

type Value = string | number | null | undefined | boolean | Criterion[]

export default class FilterHandler<Row>
{
    private table: TableHandler<Row>

    constructor(table: TableHandler<Row>)
    {
        this.table = table
    }

    public set(value: Value, field: Field<Row>, check: Check<Row> = null, uid?: string)
    {
        const { callback, identifier, key } = parseField(field, uid)
        const filter = { value, identifier, callback, check, key }

        this.table.filters = this.table.filters.filter(filter => filter.identifier !== identifier)
        if (isNotNull(value)) {
            this.table.filters.push(filter)
        }
    }

    public unset(uid: string)
    {
        this.table.filters = this.table.filters.filter(filter => filter.identifier !== uid)
    }
}
