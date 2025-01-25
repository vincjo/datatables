import type { TableHandler } from '$lib/src/server'

export default class SelectHandler<Row>
{
    private table: TableHandler<Row>

    constructor(table: TableHandler<Row>)
    {
        this.table = table
    }

    public set(value: Row[keyof Row])
    {
        if (this.table.selected.includes(value)) {
            this.table.selected = this.table.selected.filter((item) => item !== value)
        }
        else {
            this.table.selected = [value, ...this.table.selected]
        }
    }

    public all()
    {
        const selection = this.table.rows.map((row) => row[this.table['selectBy']])
        if (this.table.isAllSelected) {
            this.table.selected = this.table.selected.filter(item => selection.includes(item) === false)
        }
        else {
            this.table.selected = [...new Set([...selection, ...this.table.selected])]
        }
    }

    public clear()
    {
        this.table.selected = []
    }
}