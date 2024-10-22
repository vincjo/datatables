<script lang="ts">
    import { TableHandler, Datatable, Th, type State } from '$lib/src/server'
    import { reload } from './api'

    type Props = {
        data: { users: any[], total: number },
        all?: boolean
    }

    let { data, all = false }: Props = $props()

    const table = new TableHandler(data.users, { rowsPerPage: 10, totalRows: data.total, selectBy: 'id' })

    table.load( (state: State) => reload(state) )
</script>

<section class="bg-darken">
    <Datatable basic {table}>
        <table>
            <thead>
                <tr>
                    <Th>
                        {#if all}
                            <button class="btn" type="button" onclick={() => table.selectAll()}>
                                <i class="micon">{table.isAllSelected ? 'check_box' : 'check_box_outline_blank'}</i>
                                Select all
                            </button>
                        {/if}
                    </Th>
                    <Th>Avatar</Th>
                    <Th>Fristname</Th>
                    <Th>Lastname</Th>
                    <Th>Age</Th>
                </tr>
            </thead>
            <tbody>
                {#each table.rows as row}
                    <tr class:active={table.selected.includes(row.id)}>
                        <td>
                            <button class="btn" type="button" onclick={() => table.select(row.id)}>
                                <i class="micon">{table.selected.includes(row.id) ? 'check_box' : 'check_box_outline_blank'}</i>
                                Select me
                            </button>
                        </td>
                        <td>
                            <img src="{row.image}" alt="avatar" />
                        </td>
                        <td>{row.firstName}</td>
                        <td>{row.lastName}</td>
                        <td>{row.age}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </Datatable>
</section>

<style>
    section {
        border-radius: 8px;
        border: 1px solid var(--grey);
        width: 600px;
        padding: 0 24px;
    }
    img {
        height: 24px;
        width: 24px;
        object-fit: cover;
        /* border-radius: 50%; */
    }
    tr.active {
        background: var(--primary-lighten-1) !important;
    }
    tr.active:hover {
        background: var(--primary-lighten-2) !important;
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
