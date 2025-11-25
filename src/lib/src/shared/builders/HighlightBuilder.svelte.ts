import type { TableHandlerInterface } from '$lib/src/shared'
import { stringify } from '$lib/src/client/core'


export default class HighlightBuilder<Row>
{
    public  selector    : string
    private table       : TableHandlerInterface<Row>
    private interval    : NodeJS.Timeout
    private keywords    = $derived(this.createKeywords())

    constructor(table: TableHandlerInterface<Row>, selector: string = 'tbody')
    {
        this.table      = table
        this.selector   = selector
        this.interval   = setInterval(() => this.createHighlight(), 200)
    }

    private createHighlight()
    {
        if (!this.table?.element) {
            return
        }
        clearInterval(this.interval)
        const node = this.table.element.querySelector(this.selector)
        this.table.on('change', () => { 
            // this.reset(node)
            this.emphasize(node)
        })
    }

    private createKeywords(): string[]
    {
        return [
            this.table['search'].value ?? null,
            // ...this.table.filters.map(filter => filter.value)
        ].filter(Boolean)
    }

    private emphasize(node: Node)
    {
        if (this.keywords.length === 0) return
        if (node.nodeType === Node.ELEMENT_NODE) {
            for (const child of node.childNodes) {
                if (child.nodeName !== 'EM') {
                    this.emphasize(child)
                }
            }
        }
        else if (node.nodeType === Node.TEXT_NODE) {
            for (const keyword of this.keywords) {
                const index = stringify(node.nodeValue).indexOf(keyword)
                if (index > -1) {
                    const em = document.createElement('em')
                    em.classList.add('highlight')
                    const mid = (node as Text).splitText(index)
                    mid.splitText(keyword.length)
                    mid.parentNode.insertBefore(em, mid)
                    mid.parentNode.removeChild(mid)
                    em.appendChild(mid)
                }
            }
        }
    }
}