<script lang="ts">
    import { site } from '$site'
    import Description from './Description.svelte'
</script>


<svelte:head>
    <title>svelte simple datatables</title>
    <meta name="description" content="A powerful toolkit for building datatable components.">
</svelte:head>

<section>
    <h1>svelte simple datatables</h1>
    <h2>A powerful toolkit for building datatable components.</h2>
    <!-- <h2><b>{site.mode}</b>-side data processing</h2> -->
    <p>Streamline your data workflow with a robust API providing advanced features while reducing code complexity.</p>
    <article class="flex">
        <aside onmouseenter={() => site.setMode('client')} class="flex" class:active={site.mode === 'client'}>
            <svg width="80px" height="80px" viewBox="0 0 24 24"><path fill="currentColor" d="M1 18.77v-1h3.616V17q-.691 0-1.153-.462T3 15.385v-8.77q0-.69.463-1.152T4.615 5h14.77q.69 0 1.152.463T21 6.615v8.77q0 .69-.463 1.153T19.385 17v.77H23v1zM4.616 16h14.769q.269 0 .442-.173t.173-.442v-8.77q0-.269-.173-.442T19.385 6H4.615q-.269 0-.442.173T4 6.615v8.77q0 .269.173.442t.443.173M4 16V6z"/></svg>

            <h3>Client-side data processing</h3>
            <div class="flex">
                <a href="{site.getPath('/client/docs/getting-started/intro')}">Docs</a>
                <a href="{site.getPath('/client/examples/hello-world')}">Examples</a>
                <a href="{site.getPath('/client/api')}">API</a>
            </div>
        </aside>
        <aside onmouseenter={() => site.setMode('server')} class="flex" class:active={site.mode === 'server'}>
            <svg width="80px" height="80px" viewBox="0 0 24 24"><path fill="currentColor" d="M7.502 7.116q-.415 0-.709.29t-.293.707t.291.709t.707.294t.709-.292t.293-.706t-.291-.71t-.707-.293m0 8.77q-.415 0-.709.29q-.293.292-.293.707q0 .416.291.71t.707.293t.709-.292t.293-.706t-.291-.709t-.707-.294M4.77 4.616h14.462q.327 0 .548.22t.22.544v5.35q0 .387-.221.636q-.221.25-.548.25H4.769q-.327 0-.548-.25Q4 11.117 4 10.731V5.38q0-.325.221-.545t.548-.22m.231 1v5h14v-5zm-.23 7.77h14.422q.368 0 .588.243t.22.603v5.23q0 .426-.22.675t-.588.249H4.808q-.367 0-.588-.25q-.22-.248-.22-.673V14.23q0-.36.201-.603q.201-.244.568-.244m.231 1v5h14v-5zm0-8.768v5zm0 8.769v5z"/></svg>

            <h3>Server-side data processing</h3>
            <div class="flex">
                <a href="{site.getPath('/server/docs/getting-started/intro')}">Docs</a>
                <a href="{site.getPath('/server/examples/hello-world')}">Examples</a>
                <a href="{site.getPath('/server/api')}">API</a>
            </div>
        </aside>
    </article>

</section>

<Description/>

<style>
    h1 {
        font-size: 64px;
        margin-bottom: 0;
        line-height: 48px;
        font-weight: 400;
        color: var(--font);
        font-family: Archivo;
        letter-spacing: 0;
        margin-bottom: 8px;
        line-height: 64px;
    }
    h2 {
        font-size: 30px;
        font-weight: normal;
        margin: 0 0 24px 0;
        font-family: Archivo;
        color: var(--primary);
        line-height: 36px;
    }
    p {
        color: var(--font-grey);
        font-size: 22px;
        font-family: Inter;
        max-width: 480px;
    }
    section {
        overflow-y: auto;
        background: var(--bg-gradient);
        min-height: calc(100vh - 56px);
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
        margin: 16px 16px 16px 0;
        padding: 16px 32px 32px 32px;
        color: var(--grey);
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
        color: var(--grey);
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
    @media (max-width: 800px) {
        section {
            padding: 0 16px;
        }
        article {
            display: none;
        } 
    }
</style>