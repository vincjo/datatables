import type Context from '$lib/remote/Context'
import { type Writable, type Readable, get } from 'svelte/store'



export default class SelectHandler<Row>
{
    private rows            : Readable<Row[]>
    private selection       : Writable<{ [page: number]: (Row | Row[keyof Row])[] }>
    private isAllSelected   : Readable<boolean>
    private selectionScope  : 'currentPage' | 'acrossPages'
    private pageNumber      : Writable<number>

    constructor(context: Context<Row>)
    {
        this.rows               = context.rows
        this.selection          = context.selection
        this.isAllSelected      = context.isAllSelected
        this.selectionScope     = context.selectionScope
        this.pageNumber         = context.pageNumber
    }

    public set(value: Row | Row[keyof Row])
    {
        const { selection, currentPage } = this.parse()

        if (selection[currentPage].includes(value)) {
            this.selection.update(store => {
                store[currentPage] = store[currentPage].filter((item) => item !== value)
                return store
            })
        } else {
            this.selection.update(store => {
                store[currentPage] = [value, ...store[currentPage]]
                return store
            })
        }
        return
    }

    public all(selectBy: keyof Row = null)
    {
        const isAllSelected = get(this.isAllSelected)
        const { currentPage } = this.parse()
        if (isAllSelected) {
            this.selection.update(store => {
                store[currentPage] = []
                return store
            })
            return
        }

        const selection = this.getSelection(selectBy)

        this.selection.update(store => {
            store[currentPage] = selection
            return store
        })
    }

    public clear()
    {
        this.selection.set({ 0: [] })
    }

    private parse()
    {
        const selection = get(this.selection)
        const currentPage = this.selectionScope === 'currentPage' ? 0 : get(this.pageNumber)
        if (selection[currentPage] === undefined) {
            this.selection.update(store => {
                store[currentPage] = []
                return store
            })
        }
        return { selection, currentPage }
    }

    private getSelection(selectBy: keyof Row = null)
    {
        const rows = get(this.rows)

        if (selectBy) {
            return rows.map(row => row[selectBy])
        }
        return rows
    }
}
