
export default class EventDispatcher
{
    private listeners = {
        change      : [] as (() => void)[],
        clearFilters: [] as (() => void)[],
        clearSearch : [] as (() => void)[]
    }
    private queue: Set<string> = new Set()

    public add(event: keyof EventDispatcher['listeners'], callback: () => void)
    {
        this.listeners[event].push(callback)
    }

    public async dispatch(event: keyof EventDispatcher['listeners'])
    {
        this.queue.add(event)
        await new Promise((resolve) => setTimeout(resolve, 40))
        if (this.queue.size > 0) {
            this.run()
        }
        this.queue.clear()
    }

    private run()
    {
        for (const event of this.queue) {
            for (const callback of this.listeners[event]) {
                callback()
            }
        }
        console.log(this.queue)
    }
}