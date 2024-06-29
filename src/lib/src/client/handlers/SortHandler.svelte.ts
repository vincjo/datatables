import type { Sort, Field, TableHandler, SortParams } from '$lib/src/client'
import { parseField, sort } from '$lib/src/client/utils'
import type { UUID } from 'crypto'

export default class SortHandler<Row> 
{
    private backup  : Sort<Row>[]
    private table   : TableHandler<Row>

    constructor(table: TableHandler<Row>) 
    {
        this.table  = table
        this.backup = []
    }

    public set(field: Field<Row>, uuid: UUID, params: SortParams = {})
    {
        const { id } = parseField(field, uuid)

        if (this.table['sort'].id !== id) {
            this.table['sort'].direction = null
        }
        if (this.table['sort'].direction === null || this.table['sort'].direction === 'desc') {
            this.asc(field, id, params)
        }
        else if (this.table['sort'].direction === 'asc') {
            this.desc(field, id, params)
        }
    }

    public asc(field: Field<Row>, uuid: UUID, { locales, options }: SortParams = {})
    {
        if (!field) return
        const { id, callback, key } = parseField(field, uuid)
        this.table['sort'] = { id, callback, direction: 'asc', key }
        this.table['rawRows'] = [...this.table['rawRows']].sort((x, y) => {
            const [a, b] = [callback(x), callback(y)]
            return sort.asc(a, b, locales, options)
        })
        this.save({ id, callback, direction: 'asc' })
        this.table.setPage(1)
        this.table['event'].dispatch('change')
    }

    public desc(field: Field<Row>, uuid: UUID, { locales, options }: SortParams = {})
    {
        if (!field) return
        const { id, callback, key } = parseField(field, uuid)
        this.table['sort'] = { id, callback, direction: 'desc', key }
        this.table['rawRows'] = [...this.table['rawRows']].sort((x, y) => {
            const [a, b] = [callback(x), callback(y)]
            return sort.desc(a, b, locales, options)
        })
        this.save({ id, callback, direction: 'desc' })
    }

    public apply() 
    {
        this.restore()
    }

    public clear()
    {
        this.backup = []
        this.table['sort'] = {}
    }

    private restore()
    {
        for (const sort of this.backup) {
            const { key, callback, direction, id } = sort
            const field = key as Field<Row> ?? callback
            this[direction](field, id)
        }
    }

    private save(sort: Sort<Row>)
    {
        this.backup = this.backup.filter(item => item.id !== sort.id )
        if (this.backup.length >= 3) {
            const [_, slot2, slot3] = this.backup
            this.backup = [slot2, slot3, sort]
        }
        else {
            this.backup = [...this.backup, sort]
        }
    }

    public dispatch()
    {
        this.table.setPage(1)
        this.table['event'].dispatch('change')
    }
}
