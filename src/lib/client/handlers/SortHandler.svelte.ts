import type { Sort, Field, TableHandler } from '$lib/client'
import { parseField } from '$lib/client/utils'

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

        if (this.table.sort.identifier !== identifier) {
            this.table.sort.direction = null
        }
        if (this.table.sort.direction === null || this.table.sort.direction === 'desc') {
            this.asc(field, uid, params)
        }
        else if (this.table.sort.direction === 'asc') {
            this.desc(field, uid, params)
        }
    }

    public asc(field: Field<Row>, uid?: string, { locales, options }: Params = {})
    {
        if (!field) return
        const { identifier, callback, key } = parseField(field, uid)
        this.table.sort = { identifier, callback, direction: 'asc', key }
        this.table['rawRows'] = [...this.table['rawRows']].sort((x, y) => {
            const [a, b] = [callback(x), callback(y)]
            if (a === b) return 0
            if (a === null) return 1
            if (b === null) return -1
            if (typeof a === 'boolean') return a === false ? 1 : -1
            if (typeof a === 'string') return a.localeCompare(b as string)
            if (typeof a === 'number') return a - (b as number)
            if (typeof a === 'object') return JSON.stringify(a).localeCompare(JSON.stringify(b), locales, options)
            else return String(a).localeCompare(String(b), locales, options)
        })
        this.save({ identifier, callback, direction: 'asc' })
        this.table.setPage(1)
        this.table['events'].trigger('change')
    }

    public desc(field: Field<Row>, uid?: string, { locales, options }: Params = {})
    {
        if (!field) return
        const { identifier, callback, key } = parseField(field, uid)
        this.table.sort = { identifier, callback, direction: 'desc', key }
        this.table['rawRows'] = [...this.table['rawRows']].sort((x, y) => {
            const [a, b] = [callback(x), callback(y)]
            if (a === b) return 0
            if (a === null) return 1
            if (b === null) return -1
            if (typeof b === 'boolean') return b === false ? 1 : -1
            if (typeof b === 'string') return b.localeCompare(a as string)
            if (typeof b === 'number') return b - (a as number)
            if (typeof b === 'object') return JSON.stringify(b).localeCompare(JSON.stringify(a), locales, options)
            else return String(b).localeCompare(String(a), locales, options)
        })
        this.save({ identifier, callback, direction: 'desc' })
        this.table.setPage(1)
        this.table['events'].trigger('change')
    }

    public apply() 
    {
        this.restore()
    }

    public clear()
    {
        this.backup = []
        this.table.sort = {}
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
}
