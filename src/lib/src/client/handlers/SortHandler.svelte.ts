import type { Sort, Field, TableHandler }   from '$lib/src/client'
import { parseField, sortasc, sortdesc }    from '$lib/src/client/utils'

export type Params = {
    locales?: Intl.LocalesArgument,
    options?: Intl.CollatorOptions
}

export default class SortHandler<Row> 
{
    private backup  : Sort<Row>[]
    private table   : TableHandler<Row>

    constructor(table: TableHandler<Row>) 
    {
        this.table  = table
        this.backup = []
    }

    public set(field: Field<Row>, uid: string, params: Params = {})
    {
        const { identifier } = parseField(field, uid)

        if (this.table['sort'].identifier !== identifier) {
            this.table['sort'].direction = null
        }
        if (this.table['sort'].direction === null || this.table['sort'].direction === 'desc') {
            this.asc(field, uid, params)
        }
        else if (this.table['sort'].direction === 'asc') {
            this.desc(field, uid, params)
        }
    }

    public asc(field: Field<Row>, uid?: string, { locales, options }: Params = {})
    {
        if (!field) return
        const { identifier, callback, key } = parseField(field, uid)
        this.table['sort'] = { identifier, callback, direction: 'asc', key }
        this.table['rawRows'] = [...this.table['rawRows']].sort((x, y) => {
            const [a, b] = [callback(x), callback(y)]
            return sortasc(a, b, locales, options)
        })
        this.save({ identifier, callback, direction: 'asc' })
        this.table.setPage(1)
        this.table['event'].dispatch('change')
    }

    public desc(field: Field<Row>, uid?: string, { locales, options }: Params = {})
    {
        if (!field) return
        const { identifier, callback, key } = parseField(field, uid)
        this.table['sort'] = { identifier, callback, direction: 'desc', key }
        this.table['rawRows'] = [...this.table['rawRows']].sort((x, y) => {
            const [a, b] = [callback(x), callback(y)]
            return sortdesc(a, b, locales, options)
        })
        this.save({ identifier, callback, direction: 'desc' })
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
            const { key, callback, direction } = sort
            const param = key as Field<Row> ?? callback
            this[direction](param)
        }
    }

    private save(sort: Sort<Row>)
    {
        this.backup = this.backup.filter(item => item.identifier !== sort.identifier )
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
