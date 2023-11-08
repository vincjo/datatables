<script>
    import { check } from '$lib'
    export let handler
    export let filterBy
    let value = null
    const filter = () => {
        handler.filter(value, filterBy, check[comparator])
    }
    let comparator = 'isGreaterThan'
    $: comparator, filter()
</script>

<th>
    <aside>
        <input
            type="checkbox"
            checked={comparator === 'isGreaterThan'}
            on:click={() => (comparator = 'isGreaterThan')}
        />
        isGreaterThan
        <br />

        <input
            type="checkbox"
            checked={comparator === 'isLessThan'}
            on:click={() => (comparator = 'isLessThan')}
        />
        isLessThan

        <input type="number" bind:value on:input={filter} />
    </aside>
</th>
