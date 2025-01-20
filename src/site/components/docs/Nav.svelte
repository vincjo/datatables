<script lang="ts">
    import { TableHandler } from '$lib/src/client'
    import { path } from 'gros/page'
    import Search from '../Nav_Search.svelte'
    let { nav }: { nav: any } = $props()
    const table = new TableHandler(nav)
</script>

<nav class="thin-scrollbar">
    <Search {table}/>
    <section class="thin-scrollbar">
        {#each table.rows as item}
            <h1 class="flex">
                <i class="icon">{@html item.icon ?? ''}</i>
                {item.title}
            </h1>
            {#each item.links as link}
                <a class:active={path.name.indexOf(link.path) > -1} href="{path.get(link.path)}">{link.name}</a>
            {/each}
        {/each}
    </section>
</nav>


<style>
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
    h1 {
        font-weight: bold;
        margin-top: 16px;
        font-size: 18px;
        margin-bottom: 0;
        color: var(--font);
        font-family: Archivo;
        letter-spacing: 0.02em;
    }
    a {
        display: block;
        text-decoration: none;
        color: var(--font-grey);
        margin-top: 1px;
        margin-right: 8px;
        padding: 3px 12px 3px 28px;
        border-radius: 4px;
        transition: background, 0.2s;
    }
    a:hover {
        background: var(--primary-lighten-1);
    }
    a.active {
        text-decoration: none;
        color: var(--primary);
        font-weight: bold;
        background: var(--primary-lighten-1)
    }
    i.icon {
        color: var(--font-grey);
        width: 24px;
        height: 24px;
        margin-right: 4px;
    }
    @media (max-width: 800px) {
        nav {
            display: none;
        }
    }
    @media (min-width: 1200px) {
        nav {
            left: 96px;
        }
    }
</style>