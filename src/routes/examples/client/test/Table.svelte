<script lang="ts">
    import { TableHandler, type Row } from '$lib'
    import { data } from './data2'
    const table = new TableHandler(data, { rowsPerPage: 10 })

    // const queryBis = table.createQuery().where((row: Row) => row.ida !== row.idb)
    const query = table.createQuery()
                       .from(['groups', 'users'])
                       .where((user, value: number) => user.count > value)

    let isset = $state(false)

    const set = () => {
        if (!isset) {
            isset = true
            // queryBis.set()
            return query.set(32)
        }
        isset = false
        // queryBis.clear()
        return query.clear()
    }
</script>

<button onclick={set}>Filter [{isset}]</button>
{#each table.rows as row, i}
    <div class="flex" style:font-family="JetBrains">
        {i}. {JSON.stringify(row)} <br><br>
    </div>
{/each}