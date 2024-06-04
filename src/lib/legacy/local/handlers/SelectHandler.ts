import type Context from '$lib/legacy/local/Context'
import { type Writable, type Readable, get } from 'svelte/store'
import type EventHandler from './EventHandler'



export default class SelectHandler<Row> 
{
    private filteredRows    : Readable<Row[]>
    private pagedRows       : Readable<Row[]>
    private selected        : Writable<(Row | Row[keyof Row])[]>
    private scope           : Writable<'currentPage' | 'all'>
    private isAllSelected   : Readable<boolean>
    private event           : EventHandler

    constructor(context: Context<Row>) 
    {
        this.filteredRows   = context.filteredRows
        this.pagedRows      = context.pagedRows
        this.selected       = context.selected
        this.scope          = context.selectScope
        this.isAllSelected  = context.isAllSelected
        this.event          = context.event
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
        const scope = get(this.scope)
        const rows = scope === 'currentPage' ? get(this.pagedRows) : get(this.filteredRows)

        if (scope === 'currentPage') {
            this.event.add('change', () => this.clear())
        }

        if (selectBy) {
            this.selected.set( rows.map((row) => row[selectBy]) )
        } else {
            this.selected.set(rows)
        }
    }

    public clear() 
    {
        this.selected.set([])
    }
}
