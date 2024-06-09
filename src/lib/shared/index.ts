export { default as Datatable   } from './Datatable.svelte'
export { default as Header      } from './Header.svelte'
export { default as Footer      } from './Footer.svelte'
export { default as Pagination  } from './Pagination.svelte'
export { default as RowCount    } from './RowCount.svelte'
export { default as Search      } from './Search.svelte'
export { default as Th          } from './Th.svelte'
export { default as ThSort      } from './ThSort.svelte'
export { default as RowsPerPage } from './RowsPerPage.svelte'
import type ClientTableHandler from '$lib/client/TableHandler.svelte'
import type RemoteTableHandler from '$lib/remote/TableHandler.svelte'

export type TableHandlerLike<Row> = ClientTableHandler<Row> | RemoteTableHandler<Row>
export type FieldLike<Row> = keyof Row | any

export type Row = { [key: string]: any  }