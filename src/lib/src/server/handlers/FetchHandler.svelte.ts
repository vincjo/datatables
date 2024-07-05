import type { State, TableHandler } from '$lib/src/server'


export default class FetchHandler<Row>
{
    private table: TableHandler<Row>
    private reload: (state: State) => Promise<Row[]>

    constructor(table: TableHandler<Row>)
    {
        this.table = table
    }

    public set(callback: (state: State) => Promise<Row[]>)
    {
        this.reload = callback
    }

    public async invalidate()
    {
        if (!this.reload) return
        this.table.isLoading = true
        const state = this.table.getState()
        const data = await this.reload(state)
        this.table.isLoading = false
        if (data) {
            this.table.rows = data
        }
    }
}

