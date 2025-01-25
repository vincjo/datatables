import type { TableHandler }    from '$lib/src/client'
import { parse }                from '$lib/src/client/core'

export default class SelectHandler<Row>
{
    private table: TableHandler<Row>

    constructor(table: TableHandler<Row>)
    {
        this.table = table
    }

    public set(value: unknown)
    {
        if (this.table.selected.includes(value)) {
            this.table.selected = this.table.selected.filter((item) => item !== value)
        } else {
            this.table.selected = [value, ...this.table.selected]
        }
    }

    public all(scope: 'all' | 'currentPage')
    {
        const rows = (scope === 'currentPage') ? this.table.rows : this.table.allRows
        const { callback } = parse(this.table['selectBy'])
        const selection = rows.map(callback)
        if (scope === 'currentPage') {
            if (this.table.isAllSelected) {
                this.table.selected = this.table.selected.filter(item => selection.includes(item) === false)
            }
            else {
                this.table.selected = [...new Set([...selection, ...this.table.selected])]
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

    public getRows()
    {
        const { callback } = parse(this.table['selectBy'])
        return this.table['rawRows'].filter(row => {
            return this.table.selected.includes(callback(row as $state.Snapshot<Row>))
        })
    }
}