import type Context from '$lib/remote/Context'
import { type Writable, type Readable, get } from 'svelte/store'



export default class SelectHandler<Row> 
{
    private rows            : Readable<Row[]>
    private selected        : Writable<(Row | Row[keyof Row])[]>
    private isAllSelected   : Readable<boolean>

    constructor(context: Context<Row>) 
    {
        this.rows           = context.rows
        this.selected       = context.selected
        this.isAllSelected  = context.isAllSelected
    }

    public set(value: Row[keyof Row] | Row) 
    {
        const selected = get(this.selected)
        if (selected.includes(value)) {
            this.selected.set(selected.filter((item) => item !== value))
        } else {
            this.selected.set([value, ...selected])
        }
    }

    public all(selectBy: keyof Row = null) 
    {
        const isAllSelected = get(this.isAllSelected)
        if (isAllSelected) {
            return this.clear()
        }
        const rows = get(this.rows)

        if (selectBy) {
            this.selected.set(
                rows.map((row) => {
                    return row[selectBy]
                })
            )
        } else {
            this.selected.set(rows)
        }
    }

    public clear() 
    {
        this.selected.set([])
    }
}
