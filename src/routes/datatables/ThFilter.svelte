<script lang="ts">
    import type DataHandler from '$lib/DataHandler'
    export let handler: DataHandler
    export let filterBy = null

    let value = ''

    const filter = () => {
        handler.filter(value, filterBy)
    }
</script>



<th>
    <input type="text"
        bind:value
        placeholder="Filter"
        on:input={() => filter()}
    />
</th>



<style>
    th {
        height: 25px;
    }
    input {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 24px;
        border: none;
        border-bottom: 1px solid #eee;
        text-align: center;
        outline: none;
        border-radius: 0;
        font-size: 14px;
    }
    input::placeholder {
        color:#bdbdbd;
        font-style:italic;
        font-size:13px;
    }
    input:focus{
        outline: 1px solid #bdbdbd;
    }
</style>