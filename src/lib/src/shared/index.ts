export { default as Datatable   }    from './Datatable.svelte'
export { default as Pagination  }    from './Pagination.svelte'
export { default as RowCount    }    from './RowCount.svelte'
export { default as Search      }    from './Search.svelte'
export { default as Th          }    from './Th.svelte'
export { default as ThSort      }    from './ThSort.svelte'
export { default as ThFilter    }    from './ThFilter.svelte'
export { default as RowsPerPage }    from './RowsPerPage.svelte'
import type ClientTableHandler       from '$lib/src/client/TableHandler.svelte'
import type ServerTableHandler       from '$lib/src/server/TableHandler.svelte'
import type { Field as ClientField } from '$lib/src/client'

export type TableHandlerLike<Row> = ClientTableHandler<Row> | ServerTableHandler<Row>
export type FieldLike<Row> = ClientField<Row>

export type Row = { [key: string]: any  }