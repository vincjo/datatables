

export default class ViewHelper
{
    private element : HTMLElement
    private mutation: MutationObserver
    public columns = $state<{ name: string, index: number, isVisible?: boolean }[]>([])

    constructor(columns: { name: string, index: number, isVisible?: boolean }[])
    {
        this.columns = this.set(columns)
    }

    public toggle(name: string)
    {
        if (!this.element) return

        const column = this.columns.find(column => column.name === name)
        if (!column) return
        column.isVisible = !column.isVisible
        this.element.querySelectorAll(`tr > *:nth-child(${column.index + 1})`).forEach((element: HTMLElement) => {
            element.classList.toggle('hidden')
        })
    }

    public bind(element: HTMLElement)
    {
        this.element = element
        this.preset()
        this.mutation = new MutationObserver(() => {
            setTimeout(() => {
                this.preset()
            }, 2)
        })
        this.mutation.observe(this.element, { childList: true, subtree: true })
    }

    private set(columns: { name: string, index: number, isVisible?: boolean }[])
    {
        return columns.map(({name, index, isVisible}) => {
            return { name, index, isVisible: isVisible === false ? false : true }
        })
    }

    private preset()
    {
        if (!this.element) return
        for (const { isVisible, index } of this.columns) {
            if (isVisible === false) {
                this.element.querySelectorAll(`tr > *:nth-child(${index + 1})`).forEach((element: HTMLElement) => {
                    element.classList.add('hidden')
                })
            }
        }
    }
}