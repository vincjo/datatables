import type { TableHandler } from '$lib/client'

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
        } else {
            this.table.selected = [value, ...this.table.selected]
        }
    }

    public all()
    {
        const rows = this.table['selectScope'] === 'currentPage' ? this.table.rows : this.table.allRows
        // const selection = this.table['selectBy'] ? rows.map((row) => row[this.table['selectBy']]) : rows
        const selection = rows.map((row) => row[this.table['selectBy']])
        if (this.table['selectScope'] === 'currentPage') {
            if (this.table.isAllSelected) {
                this.table.selected = this.table.selected.filter(item => selection.includes(item as any) === false)
            }
            else {
                this.table.selected = [...selection, ...this.table.selected]
            }
        }
        else {
            this.table.isAllSelected ? this.clear() : this.table.selected = selection as any
        }
    }

    public clear()
    {
        this.table.selected = []
    }

    public getRows()
    {
        return this.table['rawRows'].filter(row => {
            return this.table.selected.includes(row[this.table['selectBy']])
        })
    }
}
