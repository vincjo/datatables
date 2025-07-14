export { default as Datatable       }   from './Datatable.svelte'
export { default as Pagination      }   from './Pagination.svelte'
export { default as RowCount        }   from './RowCount.svelte'
export { default as Search          }   from './Search.svelte'
export { default as Th              }   from './Th.svelte'
export { default as ThSort          }   from './ThSort.svelte'
export { default as ThFilter        }   from './ThFilter.svelte'
export { default as RowsPerPage     }   from './RowsPerPage.svelte'
export { default as EventDispatcher }   from './EventDispatcher'
import type { Check }                   from '$lib/src/client'


export type Row = { [key: string | number | symbol]: any }

export type Field<Row> = keyof Row | ((row: Row) => unknown)

export interface TableHandlerInterface<Row> {
    clientWidth         : number,
    element             : HTMLElement,
    pages               : readonly number[],
    pagesWithEllipsis   : readonly number[],
    currentPage         : number,
    pageCount           : number,
    i18n                : Internationalization,
    rowCount            : { selected: number, start: number, end: number, total: number }
    rowsPerPage         : number,
    clearSelection()    : void,
    createSearch(): SearchInterface,
    createFilter(field: Field<Row>, check?: Check): FilterInterface,
    createSort(field: Field<Row>): SortInterface,
    setPage(value?: number | 'previous' | 'next' | 'last'): void,
    on(event: string, callback: () => void): void 
}

export type Internationalization = {
    search     ?: string,
    show       ?: string,
    entries    ?: string,
    filter     ?: string,
    rowCount   ?: string,
    noRows     ?: string,
    previous   ?: string,
    next       ?: string
}

export type ColumnView = {
    index       : number,
    name       ?: string,
    isVisible  ?: boolean,
    isFrozen   ?: boolean,
    toggle     ?: () => void
}

export interface SearchInterface {
    value: string,
    set: () => void,
    init: (value: string) => SearchInterface
}

export interface FilterInterface {
    value: unknown,
    set: () => void,
    init: (value: unknown) => FilterInterface
}

export interface SortInterface {
    isActive: boolean,
    direction: 'asc' | 'desc',
    set: () => void,
    init: (direction?: 'asc' | 'desc') => SortInterface
}