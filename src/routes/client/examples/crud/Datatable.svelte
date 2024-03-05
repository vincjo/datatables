<script lang="ts">
    import { DataHandler, Datatable, Th } from '$lib'
    import { users } from './store'
    import { modal } from 'gros/modal'
    import Update from './Modal_Update.svelte'
    import Destroy from './Modal_Destroy.svelte'
    import Create from './Modal_Create.svelte'
    const handler = new DataHandler($users, { rowsPerPage: 10 })
    const rows = handler.getRows()

    let element

    $: $users, update()

    const update = () => {
        if (element) {
            const scrollTop = element.parentNode.scrollTop
            handler.setRows($users)
            setTimeout(() => {
                element.parentNode.scrollTop = scrollTop
            }, 2)
        }
    }
</script>

<div class="fieldset">
    <aside>
        <button class="btn create" on:click={() => modal.open(Create)}>
            <i class="micon">person_add</i>
            Add a new user
        </button>
    </aside>
    <section>
        <Datatable {handler} basic>
            <table bind:this={element}>
                <thead>
                    <tr>
                        <th/>
                        <Th {handler} orderBy="id">ID</Th>
                        <Th {handler} orderBy="first_name">First name</Th>
                        <Th {handler} orderBy="last_name">Last name</Th>
                        <Th {handler} orderBy="email">Email</Th>
                    </tr>
                </thead>
                <tbody>
                    {#each $rows as row}
                        <tr>
                            <td style:width="96px">
                                <div class="flex">
                                    <button class="btn" on:click={() => modal.open(Update, row)}>
                                        <i class="micon">edit</i>
                                    </button>
                                    <button class="btn" on:click={() => modal.open(Destroy, row)}>
                                        <i class="micon">delete_forever</i>
                                    </button>
                                </div>
                            </td>
                            <td style:width="40px">{row.id}</td>
                            <td>{row.first_name}</td>
                            <td>{row.last_name}</td>
                            <td>{row.email}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </Datatable>
    </section>
</div>

<style>
    div.fieldset {
        margin: 0 auto;
        border: 1px solid var(--grey);
        border-radius: 16px;
        padding: 16px 24px 8px 24px;
    }
    section {
        height: 400px;
    }
    section :global(footer) {
        border-top: 1px solid var(--grey);
        padding-top: 4px;
    }
    thead {
        background: var(--bg);
    }
    tbody td {
        padding: 2px 20px;
    }
    button {
        margin: 0 4px;
        background: var(--grey-lighten-1);
        border: 1px solid var(--grey);
        cursor: pointer;
        color: var(--primary);
    }
    button.create {
        margin: 8px;
        border-radius: 8px;
    }
    button.create i {
        margin: 0 8px 0 0px;
    }
    button:hover {
        background: var(--grey-lighten);
    }
    table button {
        width: 32px;
        height: 32px;
        margin: 0 2px;
        border-radius: 50%;
        background: var(--grey-lighten-1);
    }
    button i {
        color: var(--primary);
        font-size: 18px;
    }
</style>