export default class EventsHandler
{
    private events = {
        change      : [] as (() => void)[],
        clearFilters: [] as (() => void)[],
        clearSearch : [] as (() => void)[]
    }


    public add(event: keyof EventsHandler['events'], callback: () => void)
    {
        this.events[event].push(callback)
    }

    public trigger(event: keyof EventsHandler['events'])
    {
        for (const callback of this.events[event]) {
            callback()
        }
    }
}