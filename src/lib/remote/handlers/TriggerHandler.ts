import type { Event, Actions, State } from '$lib/remote'
import type Context from '$lib/remote/Context'


export default class TriggerHandler<Row>
{
    private actions: Actions
    private context: Context<Row>
    private reload: (state: State) => Promise<Row[]>

    constructor(context: Context<Row>)
    {
        this.context = context
        this.actions = {
            setPage         : undefined,
            setRowsPerPage  : undefined,
            search          : undefined,
            sort            : undefined,
            filter          : undefined,
        }

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

    public setAction(event: Event, fn: Function) 
    {
        this.actions[event] = fn
    }

    public async run(event: Event)
    {
        if (this.actions[event]) {
            const state = this.context.getState()
            const data = await this.actions[event](state)
            if (data) {
                this.context.rows.set(data)
            }
        }
        return
    }
}

