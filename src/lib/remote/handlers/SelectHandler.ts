import type Context from '$lib/remote/Context'
import { type Writable, type Readable, get } from 'svelte/store'



export default class SelectHandler<Row>
{
    private rows            : Readable<Row[]>
    private selected        : Writable<(Row | Row[keyof Row])[]>
    private isAllSelected   : Readable<boolean>
    private selectBy        : keyof Row | undefined

    constructor(context: Context<Row>)
    {
        this.rows           = context.rows
        this.selected       = context.selected
        this.isAllSelected  = context.isAllSelected
        this.selectBy       = context.selectBy
    }

    public set(value: Row | Row[keyof Row])
    {
        const selected = get(this.selected)
        if (selected.includes(value)) {
            this.selected.set(selected.filter((item) => item !== value))
        }
        else {
            this.selected.set([value, ...selected])
        }
    }

    public all()
    {
        const rows = get(this.rows)
        const isAllSelected = get(this.isAllSelected)
        this.selected.update( store => {
            if (this.selectBy) {
                return store = store.filter(item => !rows.map((row) => row[this.selectBy]).includes(item as Row[keyof Row]))
            }
            return store = store.filter(item => !rows.includes(item as Row))
        })
        if (!isAllSelected) {
            this.selected.update( store => {
                if (this.selectBy) {
                    store = [...rows.map((row) => row[this.selectBy]), ...store]
                }
                else {
                    store = [...rows, ...store]
                }
                return store
            })
        }
    }

    public clear()
    {
        this.selected.set([])
    }
}