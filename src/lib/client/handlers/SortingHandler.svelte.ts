import type { Sorting, Field, TableHandler } from '$lib/client'
import { parseField } from '$lib/client/utils'

export default class SortingHandler<Row> 
{
    private backup  : Sorting<Row>[]
    private table   : TableHandler<Row>

    constructor(table: TableHandler<Row>) 
    {
        this.table  = table
        this.backup = []
    }

    public set(field: Field<Row> = null, uid?: string)
    {
        if (!field) return
        const { identifier } = parseField(field, uid)

        if (this.table.sorting.identifier !== identifier) {
            this.table.sorting.direction = null
        }
        if (this.table.sorting.direction === null || this.table.sorting.direction === 'desc') {
            this.asc(field, uid)
        }
        else if (this.table.sorting.direction === 'asc') {
            this.desc(field, uid)
        }
    }

    public asc(field: Field<Row>, uid?: string)
    {
        if (!field) return
        const { identifier, callback, key } = parseField(field, uid)
        this.table.sorting = { identifier, callback, direction: 'asc', key }
        this.table.rawRows = this.table.rawRows.sort((x, y) => {
            const [a, b] = [callback(x), callback(y)]
            if (a === b) return 0
            if (a === null) return 1
            if (b === null) return -1
            if (typeof a === 'boolean') return a === false ? 1 : -1
            if (typeof a === 'string') return a.localeCompare(b as string)
            if (typeof a === 'number') return a - (b as number)
            if (typeof a === 'object') return JSON.stringify(a).localeCompare(JSON.stringify(b))
            else return String(a).localeCompare(String(b))
        })
        this.save({ identifier, callback, direction: 'asc' })
        this.table.events.trigger('change')
    }

    public desc(field: Field<Row>, uid?: string)
    {
        if (!field) return
        const { identifier, callback, key } = parseField(field, uid)
        this.table.sorting = { identifier, callback, direction: 'desc', key }
        this.table.rawRows = this.table.rawRows.sort((x, y) => {
            const [a, b] = [callback(x), callback(y)]
            if (a === b) return 0
            if (a === null) return 1
            if (b === null) return -1
            if (typeof b === 'boolean') return b === false ? 1 : -1
            if (typeof b === 'string') return b.localeCompare(a as string)
            if (typeof b === 'number') return b - (a as number)
            if (typeof b === 'object') return JSON.stringify(b).localeCompare(JSON.stringify(a))
            else return String(b).localeCompare(String(a))
        })
        this.save({ identifier, callback, direction: 'desc' })
        this.table.events.trigger('change')
    }

    public apply(params?: { field: Field<Row>, direction?: 'asc' | 'desc', identifier?: string }) 
    {
        if (params) {
            const { field, direction, identifier } = params
            switch (direction) {
                case 'asc' : return this.asc(field, identifier)
                case 'desc': return this.desc(field, identifier)
                default    : return this.set(field, identifier)
            }
        }
        else {
            this.restore()
        }
    }

    public clear()
    {
        this.backup = []
        this.table.sorting = {}
    }

    private restore()
    {
        for (const sort of this.backup) {
            const { key, callback, direction } = sort
            const param = key as Field<Row> ?? callback
            this[direction](param)
        }
    }

    private save(sort: Sorting<Row>)
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

    public getTable()
    {
        return this.table
    }
}
