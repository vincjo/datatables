export default class EventDispatcher
{
    private listeners = {
        change      : [] as (() => void)[],
        clearFilters: [] as (() => void)[],
        clearSearch : [] as (() => void)[]
    }

    public add(event: keyof EventDispatcher['listeners'], callback: () => void)
    {
        this.listeners[event].push(callback)
    }

    public dispatch(event: keyof EventDispatcher['listeners'])
    {
        for (const callback of this.listeners[event]) {
            callback()
        }
    }
}