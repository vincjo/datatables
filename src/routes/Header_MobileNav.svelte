<script lang="ts">
    import { slide }    from 'svelte/transition'
    import { page }     from '$app/stores'
    import { site }     from '$site'
    import Theme        from './Header_Theme.svelte'
    import Mode         from './Header_Mode.svelte'
    import Github       from './Header_Github.svelte'

    let { show = $bindable() }: { show: boolean } = $props()

    const close = () => show = false
</script>

{#if show}
    <nav transition:slide={{ duration: 120 }} class="thin-scrollbar">
        <a class="menu" class:active={$page.url.pathname.indexOf('/docs') > -1}       href="{site.getPath(`/${site.mode}/docs/getting-started/intro`)}" onclick={close}>Docs&#8599;</a>
        <a class="menu" class:active={$page.url.pathname.indexOf('/examples') > -1}   href="{site.getPath(`/${site.mode}/examples/hello-world`)}" onclick={close}>Examples&#8599;</a>
        <a class="menu" class:active={$page.url.pathname.indexOf('/api') > -1}        href="{site.getPath(`/api/${site.mode}`)}" onclick={close}>API&#8599;</a>
        <!-- <a class="menu" class:active={$page.url.pathname.indexOf('/components') > -1} href="{site.getPath(`/components`)}" onclick={close}>Components&#8599;</a> -->

        <div class="divider"></div>
        <span>Data processing</span>
        <Mode isMobile/>
        <div class="divider-16"></div>
        <span>Theme</span>
        <Theme isMobile/>
        <div class="divider-16"></div>
        <span>Source</span>
        <Github isMobile/>
        <div class="divider-16"></div>
        <span>Older doc sites</span>
        <aside class="flex">
            <a href="https://vincjo.fr/datatables.v1">V1</a>
            <a href="https://vincjo.fr/datatables.deprecated">V0 (deprecated)</a>
        </aside>
    </nav>
{/if}

<style>
    nav {
        position: absolute;
        top: 56px;
        left: 0;
        bottom: 0;
        right: 0;
        /* background: var(--bg); */
        background: var(--bg-gradient);
        z-index: 400;
        padding: 32px 40px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    a.menu {
        border-bottom: 1px solid var(--grey);
        display: flex;
        align-items: center;
        text-decoration: none;
        height: 56px;
        padding-left: 8px;
        font-weight: bold;
        letter-spacing: 0.1em;
        max-width: 320px;
        font-family: Archivo;
        font-size: 18px;
    }
    a.active {
        color: var(--primary);
        font-weight: bold;
    }
    .divider {
        margin-top: 40px;
    }
    .divider-16 {
        padding-top: 8px;
        margin-bottom: 8px;
    }
    span {
        font-family: Archivo;
        font-size: 18px;
        color: var(--font-grey);
    }
    aside a {
        font-family: JetBrains;
        color: var(--primary);
        margin: 4px 16px 4px 0;
        background: var(--grey-lighten);
        padding: 4px 8px;
        border-radius: 4px;
    }
</style>