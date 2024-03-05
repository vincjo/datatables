<script>
    import Client from '~icons/material-symbols-light/laptop-windows-outline'
    import Remote from '~icons/material-symbols-light/dns-outline'
    import { setMode, mode } from '$site/utils'
    import { getPath } from 'gros/page'
</script>

<section>
    <h1>Handle data in your Svelte projects.</h1>
    <h2>A headless solution to filter, sort, select and paginate iterable objects. You can build datatables components and more.</h2>
    <article class="flex">
        <aside on:mouseenter={() => setMode('client')} class="flex" class:active={$mode === 'client'}>
            <Client style="font-size: 80px; color: var(--font);"/>
            <h3>Client-side data processing</h3>
            <div class="flex">
                <a href="{getPath('/client/docs')}">Docs</a>
                <a href="{getPath('/client/api')}">API</a>
                <a href="{getPath('/client/examples')}">Examples</a>
            </div>
        </aside>
        <aside on:mouseenter={() => setMode('remote')} class="flex" class:active={$mode === 'remote'}>
            <Remote style="font-size: 80px; color: var(--font);"/>
            <h3>Server-side data processing</h3>
            <div class="flex">
                <a href="{getPath('/remote/docs')}">Docs</a>
                <a href="{getPath('/remote/api')}">API</a>
                <a href="{getPath('/remote/examples')}">Examples</a>
            </div>
        </aside>
    </article>

</section>


<style>
    h1 {
        color: var(--font);
        font-size: 40px;
        margin-bottom: 0;
    }
    h2 {
        color: var(--font-grey);
        font-size: 24px;
        font-weight: normal;
        max-width: 600px;
    }
    section {
        padding: 0 32px;
    }
    article {
        flex-wrap: wrap;
    }
    aside {
        flex-direction: column;
        align-items: center;
        width: 336px;
        border: 2px solid var(--grey);
        border-radius: 8px;
        margin: 16px;
        padding: 16px 32px 32px 32px;
    }
    aside:hover {
        border: 2px solid var(--primary);
    }
    aside.active {
        border: 2px solid var(--primary);
    }
    h3 {
        text-align: center;
        font-size: 20px;
        margin: 8px 0;
        color: var(--font);
    }
    aside.active h3 {
        color: var(--primary)
    }
    aside.active :global(svg) {
        color: var(--primary) !important;
    }
    a {
        text-decoration: none;
        background: var(--bg);
        color: var(--font);
        padding: 4px 12px;
        margin: 8px 4px;
        border: 1px solid var(--grey);
        border-radius: 8px;
    }
    a:hover {
        background: var(--grey-lighten-3);
    }
    @media (min-width: 1200px) {
        section {
            padding-left: 96px;
        }
    }
</style>