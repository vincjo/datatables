import type { TableHandler } from '$lib/client'

export default class PageHandler<Row> 
{
    private table : TableHandler<Row>

    constructor(table: TableHandler<Row>) 
    {
        this.table = table
    }

    public goto(page: number)
    {
        if (this.table.rowsPerPage) {
            if (page >= 1 && page <= this.table.pageCount) {
                this.table.currentPage = page
                this.table.events.trigger('change')
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
