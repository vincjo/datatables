import type { State } from '$lib/remote'
import type Context from '$lib/remote/Context'


export default class TriggerHandler<Row>
{
    private context: Context<Row>
    private reload: (state: State) => Promise<Row[]>

    constructor(context: Context<Row>)
    {
        this.context = context
    }

    public set(fn: (state: State) => Promise<Row[]>)
    {
        this.reload = fn
    }

    public async invalidate()
    {
        if (!this.reload) return
        const state = this.context.getState()
        const data = await this.reload(state)
        if (data) {
            this.context.rows.set(data)
        }
    }
}

