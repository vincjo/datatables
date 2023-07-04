<script lang="ts">
    import { onMount } from 'svelte'
    import { Th, DataHandler } from '$lib'
    const data = [
        {
            name: 'eee3',
            value: 2,
            rest: 3,
            rdm: 'abc'
        },
        {
            name: 'eee2',
            value: 2,
            rest: 2,
            rdm: 'bcd'
        },
        {
            name: 'eee1',
            value: 2,
            rest: 1,
            rdm: 'cde'
        }
    ]
    const handler = new DataHandler(data)
    const rows = handler.getRows()

    onMount(() => {
        const interval = setInterval(() => {
            console.log('setting rows')
            handler.setRows([...data])
        }, 5000)

        return () => clearInterval(interval)
    })
</script>

<table>
    <thead>
        <tr>
            <Th {handler} orderBy="name">name</Th>
            <Th {handler} orderBy="value">value</Th>
            <Th {handler} orderBy="rest">rest</Th>
            <Th {handler} orderBy="rdm">rdm</Th>
        </tr>
    </thead>
    <tbody>
        {#each $rows as row}
            <tr>
                <td>{row.name}</td>
                <td>{row.value}</td>
                <td>{row.rest}</td>
                <td>{row.rdm}</td>
            </tr>
        {/each}
    </tbody>
</table>
