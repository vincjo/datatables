<script lang="ts">
    import type {  DataHandler } from '$lib';
    export let handler: DataHandler;
    export let key: any = '';
    let value = '';
    const filter = handler.createFilter((row) => row[key])
</script>

<th>
    <input
        type="text"
        placeholder="Filter"
        bind:value
        on:input={() => filter.set(value)}
    />
</th>