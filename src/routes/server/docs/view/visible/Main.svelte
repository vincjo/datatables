<script lang="ts">
    import { TableHandler, Datatable, ThSort, RowsPerPage, RowCount, Pagination, type State } from '$lib/src/server'
    import { reload } from '../api'
    let { data }: { data: any } = $props()

    const table = new TableHandler(data, { rowsPerPage: 20, totalRows: 500 })
    table.load((state: State) => reload(state) )
    const view = table.createView([
        { index: 0, name: 'ID', isVisible: false },
        { index: 1, name: 'Name' },
        { index: 2, name: 'Email' },
        { index: 3, name: 'Comment' },
    ])
</script>

<section class="bg-darken flex">
    <aside>
        <h1>Toggle visibility</h1>
        {#each view.columns as column}
            <button type="button" onclick={() => column.toggle()} class="flex">
                <i class="micon">{column.isVisible ? 'check_box' : 'check_box_outline_blank'}</i>
                <span>{column.name}</span>
            </button>
        {/each}
    </aside>
    <article class="bg-darken">
        <Datatable {table}>
            {#snippet header()}
                <div></div>
                <RowsPerPage {table}/>
            {/snippet}
            <table>
                <thead>
                    <tr>
                        <ThSort {table} field="id">ID</ThSort>
                        <ThSort {table} field="name">Name</ThSort>
                        <ThSort {table} field="email">Email</ThSort>
                        <ThSort {table} field="body">Comment</ThSort>
                    </tr>
                </thead>
                <tbody>
                    {#each table.rows as row}
                        <tr>
                            <td>{row.id}</td>
                            <td><b>{row.name.substring(0, 8)}</b></td>
                            <td>{row.email}</td>
                            <td><p>{row.body.substring(0, 40) + '...'}</p></td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            {#snippet footer()}
                <RowCount {table}/>
                <Pagination {table}/>
            {/snippet}
        </Datatable>
    </article>
</section>

<style>
    section {
        border: 1px solid var(--grey);
        border-radius: 8px;
        align-items: flex-start;
    }
    article {
        width: 100%;
        border-radius: 0 8px 8px 0;
        padding: 0;
        border-left: 1px solid var(--grey);
        height: 480px;
    }
    aside {
        margin: 24px 16px;
        border-radius: 8px;
        border: 1px solid var(--grey);
        background: var(--bg);
        padding: 0 16px 8px 16px;
    }
    button {
        color: var(--font);
        width: 120px;
        height: 32px;
        margin: 2px 0;
        text-align: left;
    }
    button i {
        font-size: 18px;
        margin-right: 8px;
        color: var(--font-grey);
    }
    h1 {
        font-size: 18px;
        color: var(--secondary);
        margin: 8px 0;
    }
    p {
        font-size: 12px;
        margin: 0;
    }
</style>
