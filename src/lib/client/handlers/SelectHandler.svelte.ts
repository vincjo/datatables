import type { TableHandler } from '$lib/client'

export default class SelectHandler<Row>
{
    private table: TableHandler<Row>

    constructor(table: TableHandler<Row>)
    {
        this.table = table
    }

    public set(value: Row[keyof Row] | Row)
    {
        if (this.table.selected.includes(value)) {
            this.table.selected = this.table.selected.filter((item) => item !== value)
        } else {
            this.table.selected = [value, ...this.table.selected]
        }
    }

    public all()
    {
        const rows = this.table.selectScope === 'currentPage' ? this.table.rows : this.table.filteredRows
        const selection = this.table.selectBy ? rows.map((row) => row[this.table.selectBy]) : rows
        if (this.table.selectScope === 'currentPage') {
            if (this.table.isAllSelected) {
                this.table.selected = this.table.selected.filter(item => selection.includes(item) === false)
            }
            else {
                this.table.selected = [...selection, ...this.table.selected]
            }
        }
        else {
            this.table.isAllSelected ? this.clear() : this.table.selected = selection
        }
    }

    public clear()
    {
        this.table.selected = []
    }
}
