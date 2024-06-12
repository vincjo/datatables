<script lang="ts">
    import { TableHandler, Datatable, ThSort, ThFilter } from '$lib/client'
    import myData from '$site/data/data.75'

    const table = new TableHandler(myData, { rowsPerPage: 10 })
    const view = table.createView([
        { index: 0, name: 'ID', isVisible: false },
        { index: 1, name: 'First name' },
        { index: 2, name: 'Last name' },
        { index: 3, name: 'Email' },
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
        <Datatable basic {table}>
            <table>
                <thead>
                    <tr>
                        <ThSort {table} field="id">ID</ThSort>
                        <ThSort {table} field="first_name">First Name</ThSort>
                        <ThSort {table} field="last_name">Last Name</ThSort>
                        <ThSort {table} field="email">Email</ThSort>
                    </tr>
                    <tr>
                        <ThFilter {table} field="id"/>
                        <ThFilter {table} field="first_name"/>
                        <ThFilter {table} field="last_name"/>
                        <ThFilter {table} field="email"/>
                    </tr>
                </thead>
                <tbody>
                    {#each table.rows as row}
                        <tr>
                            <td>{row.id}</td>
                            <td>{row.first_name}</td>
                            <td>{row.last_name}</td>
                            <td>{row.email}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
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
        color: var(--ternary);
        margin: 8px 0;
    }
    td {
        white-space: nowrap;
    }
</style>
