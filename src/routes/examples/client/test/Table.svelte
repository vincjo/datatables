<script lang="ts">
    import { TableHandler, Datatable, Th, type Check } from '$lib'
    import { data } from './data2'
    const table = new TableHandler(data)

    const filter = table.createAdvancedFilter('groups').isNotRecursive()
    const groups = table.createCalculation('groups').distinct()

    const isIn: Check = (entry: string[], value: string) => entry.includes(value)
    const isNotIn: Check = (entry: string[], value: string) => entry.includes(value) ? false : true
</script>

<div class="flex">
    <aside>
        {#each groups as { value, count}}
        <li class="flex"> 
            {value} ({count})
            <!-- <button onclick={() => filter.set(value, isIn)}>IN {filter.criteria.includes(value) ? '☑' : '☐'}</button> -->
            <button onclick={() => filter.set(value, isNotIn)}>NOT IN {filter.criteria.includes(value) ? '☑' : '☐'}</button>
        </li>
        {/each}
    </aside>
    <article>
        <Datatable {table} basic>
            <table>
                <thead>
                    <tr>
                        <Th>id</Th>
                        <Th>name</Th>
                        <Th>groups</Th>
                    </tr>
                </thead>
                <tbody>
                    {#each table.rows as {id, name, groups}}
                        <tr>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{groups.join(', ')}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </Datatable>
    </article>
</div>

<style>
    div {
        border: 1px solid red;
    }
    aside {
        width: 200px;
        height: 200px;
        border: 1px solid green;
    }
    button {
        display: block;
        color: var(--font);
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid var(--grey);
        margin: 2px 0;
    }
</style>