<script>
    import { DataHandler } from '$lib/local'
    import { tab1, tab2 } from './data'
    import Table from './Table.svelte'
    const handler = new DataHandler(tab1, { rowsPerPage: 50 })
    let active = 'tab1'

    $: active, update()

    const update = () => {
        if (active === 'tab1') {
            handler.setRows(tab1)
        }
        else {
            handler.setRows(tab2)
        }
    }
</script>

<ul class="flex">
    <li class:active={active === 'tab1'}>
        <button on:click={() => active = 'tab1'}>Tab1 ({tab1.length})</button>
    </li>
    <li class:active={active === 'tab2'}>
        <button on:click={() => active = 'tab2'}>Tab2 ({tab2.length})</button>
    </li>
</ul>

<section>
    <Table {handler}/>
</section>



<style>
    section {
        width: 640px;
    }
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    li {
        width: 90px;
        text-align: center;
    }
    li.active {
        border-bottom: 4px solid var(--secondary);
    }
    button {
        font-weight: bold;
        font-size: 16px;

    }
</style>