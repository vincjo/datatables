import type Context from '$lib/client/Context'
import { type Writable, type Readable, get } from 'svelte/store'
import type EventsHandler from './EventsHandler'



export default class SelectHandler<Row>
{
    private filteredRows    : Readable<Row[]>
    private pagedRows       : Readable<Row[]>
    private selected        : Writable<(Row | Row[keyof Row])[]>
    private scope           : Writable<'currentPage' | 'all'>
    private selectBy        : string
    private isAllSelected   : Readable<boolean>

    constructor(context: Context<Row>)
    {
        this.filteredRows   = context.filteredRows
        this.pagedRows      = context.pagedRows
        this.selected       = context.selected
        this.scope          = context.selectScope
        this.selectBy       = context.selectBy
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

    public all()
    {
        const scope = get(this.scope)
        const rows = scope === 'currentPage' ? get(this.pagedRows) : get(this.filteredRows)
        const selection = this.selectBy ? rows.map((row) => row[this.selectBy]) : rows
        const isAllSelected = get(this.isAllSelected)
        if (scope === 'currentPage') {
            this.selected.update(store => {
                if (isAllSelected) {
                    store = store.filter(item => selection.includes(item) === false)
                    return store
                }
                store = [...store, ...selection]
                return store
            })
        }
        else {
            isAllSelected ? this.clear() : this.selected.set(selection)
        }
    }

    public clear()
    {
        this.selected.set([])
    }
}
