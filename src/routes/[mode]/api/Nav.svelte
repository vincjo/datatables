<script>
    import { TableHandler } from '$lib/client'
    import Key from './Nav_Key.svelte'
    let { nav } = $props()
    let value = $state('')
    const table = new TableHandler()
</script>


<nav>
    <input type="text" placeholder="Search..." spellcheck="false" bind:value={value}/>
    <section class="thin-scrollbar">
        <Key data={nav.properties} {table} {value} key={'properties'}/>
        <Key data={nav.methods}    {table} {value} key={'methods'}/>
        <Key data={nav.types}      {table} {value} key={'types'}/>
    </section>
</nav>


<style>
    input {
        background: var(--bg);
        border: 1px solid var(--grey);
        color: var(--font);
        width: 100%;
    }
    nav {
        position: absolute;
        top:0;
        bottom: 0;
        left: 32px;
        width: 240px;
        padding: 24px 16px 24px 0;
        border-right: 1px solid var(--grey);
    }

    section {
        position: absolute;
        top: 80px;
        bottom: 0px;
        left: 0;
        right: 16px;
        overflow-y: auto;
        border-top: 1px dotted var(--grey);
        padding-bottom: 40px;
    }
    @media (min-width: 1200px) {
        nav {
            left: 96px;
        }
    }
    @media (max-width: 800px) {
        nav {
            display: none;
        }
    }
</style>