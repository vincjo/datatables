<script>
    import data from '$site/data/data'
    import { TableHandler, Datatable, ThSort, Th } from '$lib/client'

    let { all = false, scope = 'currentPage' } = $props()

    const table = new TableHandler(data, { selectBy: 'id', rowsPerPage: 10 })
</script>


<section class="bg-darken">
    <Datatable basic {table}>
        <table>
            <thead>
                <tr>
                    <Th>
                        {#if all}
                            <button class="btn" type="button" onclick={() => table.selectAll({ scope: scope })}>
                                <i class="micon">{table.isAllSelected ? 'check_box' : 'check_box_outline_blank'}</i>
                                Select all
                            </button>
                        {/if}
                    </Th>
                    <ThSort {table} field="id">id</ThSort>
                    <ThSort {table} field="first_name">first_name</ThSort>
                    <ThSort {table} field="last_name">last_name</ThSort>
                </tr>
            </thead>
            <tbody>
                {#each table.rows as row}
                    <tr class:active={table.selected.includes(row.id)}>
                        <td>
                            <button class="btn" type="button" onclick={() => table.select(row.id)}>
                                <i class="micon">{table.selected.includes(row.id) ? 'check_box' : 'check_box_outline_blank'}</i>
                                Select row
                            </button>
                        </td>
                        <td>{row.id}</td>
                        <td>{row.first_name}</td>
                        <td>{row.last_name}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </Datatable>
</section>


<style>
    section {
        border-radius: 8px;
        padding: 16px 40px 0 40px;
        width: 800px;
        margin: 16px 0;
        border: 1px solid var(--grey);
    }
    tr.active {
        background: var(--primary-lighten-1);
    }
    tr.active:hover {
        background: var(--primary-lighten-2);
    }
    button {
        padding: 0;
        color: var(--font);
        text-transform: none;
        letter-spacing: 0;
        font-weight: bold;
        background: transparent;
    }
    button i {
        color: var(--font-grey);
        margin-right: 4px;
    }
</style>