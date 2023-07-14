import type Context from '$lib/local/Context'
import { type Writable, type Readable, get } from 'svelte/store'



export default class SelectHandler<Row> 
{
    private filteredRows    : Readable<Row[]>
    private pagedRows       : Readable<Row[]>
    private selected        : Writable<(Row | Row[keyof Row])[]>
    private scope           : 'currentPage' | 'all'
    private isAllSelected   : Readable<boolean>

    constructor(context: Context<Row>) 
    {
        this.filteredRows   = context.filteredRows
        this.pagedRows      = context.pagedRows
        this.selected       = context.selected
        this.scope          = context.selectScope
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
            return this.remove()
        }
        const rows = this.scope === 'currentPage' ? get(this.pagedRows) : get(this.filteredRows)

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

    public remove() 
    {
        this.selected.set([])
    }
}
