import type { TableHandler } from '$lib/remote'

export default class PageHandler<Row>
{
    private table: TableHandler<Row>

    constructor(table: TableHandler<Row>)
    {
        this.table = table
    }

    public goto(number: number)
    {
        if (this.table.rowsPerPage && this.table.totalRows) {
            if (number >= 1 && number <= this.table.pageCount) {
                this.table.currentPage = number
                this.table.events.trigger('change')
                this.table.invalidate()
            }
        }
        else {
            if (number >= 1) {
                this.table.currentPage = number
                this.table.events.trigger('change')
                this.table.invalidate()
            }
        }
    }

    public previous()
    {
        this.goto(this.table.currentPage - 1)
    }

    public next()
    {
        this.goto(this.table.currentPage + 1)
    }
}
