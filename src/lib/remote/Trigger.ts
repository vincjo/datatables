import type { Event, Actions } from '$lib/remote'
import type Context from './Context'


export default class Trigger<Row>
{

    public actions: Actions
    public context: Context<Row>

    constructor(context: Context<Row>)
    {
        this.context = context
        this.actions = {
            navigate: undefined,
            display: undefined,
            search: undefined,
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

