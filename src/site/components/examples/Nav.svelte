<script lang="ts">
    import { TableHandler } from '$lib/client'
    import { getPath, url } from 'gros/page'
    import { mode } from '$site/utils'
    type Props = { nav: { title: string, page: string, description: string, tag: string[] }[] }
    let { nav }: Props = $props()
    const handler = new TableHandler(nav)
</script>


<nav>
    <input type="text" placeholder="Search..." spellcheck="false" bind:value={handler.search.value}/>
    <section class="thin-scrollbar">
        {#each handler.rows as row}
            <a href="{getPath(`/${$mode}/examples/${row.page}`)}" class:active={$url.indexOf(row.page) > -1}>
                <b>{row.title}</b>
                <span>{row.description}</span>
            </a>
            <div class="divider"></div>
        {/each}
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
        bottom: 24px;
        left: 0;
        right: 16px;
        overflow-y: auto;
        border-top: 1px dotted var(--grey);
        padding-top: 8px;
    }
    a {
        display: block;
        text-decoration: none;
        padding: 8px 12px;
        transition: all, 0.2s;
        border-radius: 8px;
        color: var(--primary);
    }
    a:hover {
        background: var(--grey-lighten-2);
    }
    a.active {
        background: var(--primary-lighten-1);
    }
    a b {
        display: block;
        font-size: 16px;
    }
    a span {
        color: var(--font-grey);
        display: block;
        font-size: 13px;
        line-height: 16px;
    }
    div.divider {
        width: 96%;
        height: 8px;
        border-top: 1px solid var(--grey);
        margin: 8px auto 0 auto;
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