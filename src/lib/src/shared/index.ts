export { default as Datatable       }   from './Datatable.svelte'
export { default as Pagination      }   from './Pagination.svelte'
export { default as RowCount        }   from './RowCount.svelte'
export { default as Search          }   from './Search.svelte'
export { default as Th              }   from './Th.svelte'
export { default as ThSort          }   from './ThSort.svelte'
export { default as ThFilter        }   from './ThFilter.svelte'
export { default as RowsPerPage     }   from './RowsPerPage.svelte'
export { default as EventDispatcher }   from './EventDispatcher'
import type { Check, Field as ClientField  }   from '$lib/src/client'
import type ClientTableHandler          from '$lib/src/client/TableHandler.svelte'
import type ServerTableHandler          from '$lib/src/server/TableHandler.svelte'

export type TableHandlerLike<Row> = ClientTableHandler<Row> | ServerTableHandler<Row>
export type FieldLike<Row> = ClientField<Row>

export type Row = { [key: string]: any }

export interface TableHandlerInterface<Row> {
    clientWidth: number,
    element: HTMLElement,
    pages: readonly number[],
    pagesWithEllipsis: readonly number[],
    currentPage: number,
    setPage(value?: number | 'previous' | 'next' | 'last'): void,
    pageCount: number,
    i18n: Internationalization,
    rowCount: { selected: number, start: number, end: number, total: number }
    clearSelection(): void,
    rowsPerPage: number,
    createSearch(): {
        value: unknown,
        set(): void
    }
    createFilter(field: keyof Row | ((row: Row) => unknown), check?: Check): {
        value: unknown,
        set(): void
    },
    createSort(field: keyof Row | ((row: Row) => unknown)): {
        isActive: boolean,
        direction: 'asc' | 'desc',
        set(): void
    }
    on(event: string, callback: () => void): void 
}

export type Internationalization = {
    search  ?: string,
    show    ?: string,
    entries ?: string,
    filter  ?: string,
    rowCount?: string,
    noRows  ?: string,
    previous?: string,
    next    ?: string
}

export type ColumnView = {
    index: number,
    name?: string,
    isVisible?: boolean,
    isFrozen?: boolean,
    toggle?: () => void
}