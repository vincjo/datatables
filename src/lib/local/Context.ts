import { writable, derived, type Writable, type Readable } from 'svelte/store'
import type { Filter, Sort, Comparator, Criterion, Field } from '$lib/local'
import type { Params }  from '$lib/local/DataHandler'
import { isNull, parseField } from './utils'
import { check } from './Comparator'
import EventHandler from '$lib/remote/handlers/EventHandler'


export default class Context<Row> 
{
    public event                : EventHandler
    public rowsPerPage          : Writable<number | null>
    public pageNumber           : Writable<number>
    public search               : Writable<{ value?: string, scope?: (keyof Row)[] }>
    public filters              : Writable<Filter<Row>[]>
    public filterCount          : Readable<number>
    public rawRows              : Writable<Row[]>
    public filteredRows         : Readable<Row[]>
    public pagedRows            : Readable<Row[]>
    public rowCount             : Readable<{ total: number, start: number, end: number }>
    public pages                : Readable<number[]>
    public pagesWithEllipsis    : Readable<number[]>
    public pageCount            : Readable<number>
    public sort                 : Writable<(Sort<Row>)>
    public selected             : Writable<(Row | Row[keyof Row])[]>
    public selectScope          : Writable<'all' | 'currentPage'>
    public isAllSelected        : Readable<boolean>

    constructor(data: Row[], params: Params) 
    {
        this.event               = new EventHandler()
        this.rowsPerPage         = writable(params.rowsPerPage)
        this.pageNumber          = writable(1)
        this.search              = writable({})
        this.filters             = writable([])
        this.filterCount         = this.createFilterCount()
        this.rawRows             = writable(data)
        this.filteredRows        = this.createFilteredRows()
        this.pagedRows           = this.createPagedRows()
        this.rowCount            = this.createRowCount()
        this.pages               = this.createPages()
        this.pagesWithEllipsis   = this.createPagesWithEllipsis()
        this.pageCount           = this.createPageCount()
        this.sort                = writable({})
        this.selected            = writable([])
        this.selectScope         = writable('all')
        this.isAllSelected       = this.createIsAllSelected()
    }

    private createFilterCount()
    {
        return derived(this.filters, ($filters) => $filters.length)
    }

    private createFilteredRows() 
    {
        return derived(
            [this.rawRows, this.search, this.filters],
            ([$rawRows, $search, $filters]) => {
                if ($search.value) {
                    $rawRows = $rawRows.filter((row) => {
                        const fields = $search.scope ?? Object.keys(row) as Field<Row>[]
                        const scope = fields.map((field: Field<Row>) => {
                            const { callback } = parseField(field)
                            return callback
                        })
                        return scope.some((callback) => {
                            return this.match(callback(row), $search.value)
                        })
                    })
                    this.pageNumber.set(1)
                    this.selected.set([])
                    this.event.trigger('change')
                }

                if ($filters.length > 0) {
                    $filters.forEach((filter) => {
                        return ($rawRows = $rawRows.filter((row) => {
                            const entry = filter.callback(row)
                            return this.match(entry, filter.value, filter.comparator)
                        }))
                    })
                    this.pageNumber.set(1)
                    this.selected.set([])
                    this.event.trigger('change')
                }
                return $rawRows
            }
        )
    }

    private match(entry: Row[keyof Row], value: string|number|boolean|symbol|number[]|Criterion[], compare: Comparator<Row> = null) 
    {
        if (isNull(value)) {
            return true
        }
        if (!entry && compare) {
            return compare(entry, value)
        }
        if (!entry) return check.isLike(entry, value)
        else if (typeof entry === 'object') {
            return Object.keys(entry).some((k) => {
                return this.match(entry[k], value, compare)
            })
        }
        if (!compare) return check.isLike(entry, value)
        return compare(entry, value)
    }

    private createPagedRows()
    {
        return derived(
            [this.filteredRows, this.rowsPerPage, this.pageNumber],
            ([$filteredRows, $rowsPerPage, $pageNumber]) => {
                if (!$rowsPerPage) {
                    return $filteredRows
                }
                return $filteredRows.slice(
                    ($pageNumber - 1) * $rowsPerPage,
                    $pageNumber * $rowsPerPage
                )
            }
        )
    }

    private createRowCount()
    {
        return derived(
            [this.filteredRows, this.pageNumber, this.rowsPerPage],
            ([$filteredRows, $pageNumber, $rowsPerPage]) => {
                const total = $filteredRows.length
                if (!$rowsPerPage) {
                    return { total: total, start: 1, end: total }
                }
                return {
                    total: total,
                    start: $pageNumber * $rowsPerPage - $rowsPerPage + 1,
                    end: Math.min($pageNumber * $rowsPerPage, $filteredRows.length)
                }
            }
        )
    }

    private createPages()
    {
        return derived([this.rowsPerPage, this.filteredRows], ([$rowsPerPage, $filteredRows]) => {
            if (!$rowsPerPage) {
                return [1]
            }
            const pages = Array.from(Array(Math.ceil($filteredRows.length / $rowsPerPage)))
            return pages.map((_, i) =>  i + 1 )
        })
    }

    private createPagesWithEllipsis()
    {
        return derived([this.pages, this.pageNumber], ([$pages, $pageNumber]) => {
            if ($pages.length <= 7) {
                return $pages
            }
            const ellipse = null
            const firstPage = 1
            const lastPage = $pages.length
            if ($pageNumber <= 4) {
                return [
                    ...$pages.slice(0, 5),
                    ellipse,
                    lastPage
                ]
            } else if ($pageNumber < $pages.length - 3) {
                return [
                    firstPage,
                    ellipse,
                    ...$pages.slice($pageNumber - 2, $pageNumber + 1),
                    ellipse,
                    lastPage
                ]
            } else {
                return [
                    firstPage,
                    ellipse,
                    ...$pages.slice($pages.length - 5,
                    $pages.length)
                ]
            }
        })
    }

    private createPageCount()
    {
        return derived(this.pages, ($pages) => {
            return $pages.length
        })
    }

    private createIsAllSelected()
    {
        return derived(
            [this.selected, this.pagedRows, this.filteredRows, this.selectScope],
            ([$selected, $pagedRows, $filteredRows, $selectScope]) => {
                const rowCount = $selectScope === 'currentPage' ? $pagedRows.length : $filteredRows.length
                if (rowCount === $selected.length && rowCount !== 0) {
                    return true
                }
                return false
            }
        )
    }
}
