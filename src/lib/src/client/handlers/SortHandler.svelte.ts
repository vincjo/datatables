import type { Field, TableHandler, SortParams } from '$lib/src/client'
import { type Sort, parse, sort } from '$lib/src/client/core'

export default class SortHandler<Row> 
{
    private backup  : Sort<Row>[]
    private table   : TableHandler<Row>

    constructor(table: TableHandler<Row>) 
    {
        this.table  = table
        this.backup = []
    }

    public set(field: Field<Row>, id: string, params: SortParams = {})
    {
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

    public asc(field: Field<Row>, id: string, { locales, options }: SortParams = {})
    {
        if (!field) return
        const { callback, key } = parse(field, id)
        this.table['sort'] = { id, callback, direction: 'asc', key }
        this.table['rawRows'] = [...this.table['rawRows']].sort((x, y) => {
            const [a, b] = [callback(x as $state.Snapshot<Row>), callback(y as $state.Snapshot<Row>)]
            return sort.asc(a, b, locales, options)
        })
        this.save({ id, callback, direction: 'asc' })
        this.table.setPage(1)
    }

    public desc(field: Field<Row>, id: string, { locales, options }: SortParams = {})
    {
        if (!field) return
        const { callback, key } = parse(field, id)
        this.table['sort'] = { id, callback, direction: 'desc', key }
        this.table['rawRows'] = [...this.table['rawRows']].sort((x, y) => {
            const [a, b] = [callback(x as $state.Snapshot<Row>), callback(y as $state.Snapshot<Row>)]
            return sort.desc(a, b, locales, options)
        })
        this.save({ id, callback, direction: 'desc' })
        this.table.setPage(1)
    }

    public clear()
    {
        this.backup = []
        this.table['sort'] = {}
    }

    public restore()
    {
        for (const { key, callback, direction, id } of this.backup) {
            const field = (key ?? callback) as Field<Row>
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
}
