import type { TableHandler } from '$lib/src/server'
import { SvelteSet }         from '$lib/legacy'

export default class SelectHandler<Row>
{
    private table: TableHandler<Row>

    constructor(table: TableHandler<Row>)
    {
        this.table = table
    }

    public set(value: Row[keyof Row])
    {
        if (this.table.selected.has(value)) {
            this.table.selected.delete(value)
        }
        else {
            this.table.selected.add(value)
        }
    }

    public all()
    {
        const selection = this.table.rows.map((row) => row[this.table['selectBy']])
        if (this.table.isAllSelected) {
            this.table.selected = new SvelteSet([...this.table.selected].filter(item => selection.includes(item) === false))
        }
        else {
            this.table.selected = new SvelteSet([...selection, ...this.table.selected])
        }
    }

    public clear()
    {
        this.table.selected.clear()
    }
}