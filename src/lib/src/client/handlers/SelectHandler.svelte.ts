import type { TableHandler }    from '$lib/src/client'
import { parse }                from '$lib/src/client/core'
import { SvelteSet }            from '$lib/legacy'

export default class SelectHandler<Row>
{
    private table: TableHandler<Row>

    constructor(table: TableHandler<Row>)
    {
        this.table = table
    }

    public set(value: unknown)
    {
        if (this.table.selected.has(value)) {
            this.table.selected.delete(value)
        }
        else {
            this.table.selected.add(value)
        }
    }

    public all(scope: 'all' | 'currentPage')
    {
        const rows = (scope === 'currentPage') ? this.table.rows : this.table.allRows
        const { callback } = parse(this.table['selectBy'])
        const selection = rows.map(callback)
        if (scope === 'currentPage') {
            if (this.table.isAllSelected) {
                this.table.selected = new SvelteSet([...this.table.selected].filter(item => selection.includes(item) === false))
            }
            else {
                this.table.selected = new SvelteSet([...selection, ...this.table.selected])
            }
        }
        else {
            this.table.isAllSelected ? this.clear() : this.table.selected = new SvelteSet(selection)
        }
    }

    public clear()
    {
        this.table.selected.clear()
    }

    public getRows()
    {
        const { callback } = parse(this.table['selectBy'])
        return this.table['rawRows'].filter(row => {
            return this.table.selected.has(callback(row as $state.Snapshot<Row>))
        })
    }
}