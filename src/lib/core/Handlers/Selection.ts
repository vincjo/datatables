import { type Writable, type Readable, writable, derived, get } from 'svelte/store'
import type Context from '../Context'

type Scope = 'page' | 'all'

export default class Selection
{
    private context : Context
    public selected : Writable<any[]>
    public scope: Scope
    public checked: Readable<boolean>

    constructor(context: Context)
    {
        this.context = context
        this.selected = writable([])
        this.scope = 'page'
        this.checked = this.createChecked()
    }

    public get()
    {
        return this.selected
    }

    public set(id: any)
    {
        const selected = get(this.selected)
        if (selected.includes(id)) {
            this.selected.set( selected.filter(item => item !== id) )
        }
        else {
            this.selected.set([id, ...selected])
        }
    }

    public all(accessor: string)
    {
        const checked = get(this.checked)
        if (checked) {
            return this.remove()
        }
        const rows = (this.scope === 'page') ? get(this.context.rows) : get(this.context.filteredRows)

        this.selected.set(rows.map(row => { return row[accessor] }))
    }

    public remove()
    {
        this.selected.set([])
    }

    private createChecked(): Readable<boolean>
    {
        return derived(
            [this.selected, this.context.rows, this.context.filteredRows],
            ([$selected, $rows, $filteredRows]) => {
                const rowCount = (this.scope === 'page') ? $rows.length :  $filteredRows.length
                if (rowCount === $selected.length) {
                    return true
                }
                return false
            }
        )
    }
}