import type Context from '$lib/local/Context'
import type { Selectable } from '$lib/local'
import { type Writable, type Readable, get } from 'svelte/store'



export default class SelectHandler<Row> 
{
    private filteredRows    : Readable<Row[]>
    private rows            : Readable<Row[]>
    private selected        : Writable<Selectable<Row>[]>
    private selectScope     : Writable<'currentPage' | 'all'>
    private isAllSelected   : Readable<boolean>

    constructor(context: Context<Row>) 
    {
        this.filteredRows   = context.filteredRows
        this.rows           = context.rows
        this.selected       = context.selected
        this.selectScope    = context.selectScope
        this.isAllSelected  = context.isAllSelected
    }

    public select(value: Selectable<Row>) 
    {
        const selected = get(this.selected)
        if (selected.includes(value)) {
            this.selected.set(selected.filter((item) => item !== value))
        } else {
            this.selected.set([value, ...selected])
        }
    }

    public selectAll(selectBy: keyof Row = null) 
    {
        const isAllSelected = get(this.isAllSelected)
        const selectScope = get(this.selectScope)
        if (isAllSelected) {
            return this.unselectAll()
        }
        const rows = selectScope === 'currentPage' ? get(this.rows) : get(this.filteredRows)

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

    public unselectAll() 
    {
        this.selected.set([])
    }
}
