<script lang="ts">
    import { site, Logo } from '$site'
    import { getPath }  from 'gros/page'
    import Github       from './Header_Github.svelte'
    import Version      from './Header_Version.svelte'
    import Theme        from './Header_Theme.svelte'
    import Mode         from './Header_Mode.svelte'
    import MobileNav    from './Header_MobileNav.svelte'
    import { path }     from 'gros/page'
    import { dev }      from '$app/environment'

    let show = $state(false)
</script>

<header class="flex">
    <a class="flex logo" href="{getPath('/')}" onclick={() => show = false}>
        <Logo height="32px"/>
        <span class="desktop">svelte simple datatables</span>
        <span class="mobile">SSD</span>
    </a>
    <nav class="flex desktop">
        <aside class="flex">
            <a class="menu" class:active={path.current.includes('/docs')}       href="{getPath(`/docs/${site.mode}/getting-started/intro`)}">Docs</a>
            <a class="menu" class:active={path.current.includes('/examples')}   href="{getPath(`/examples/${site.mode}/hello-world`)}">Examples</a>
            <a class="menu" class:active={path.current.includes('/api')}        href="{getPath(`/api/${site.mode}`)}">API</a>
            <!-- <a class="menu" class:active={path.current.includes('/components')} href="{getPath(`/components`)}">Components</a> -->
            {#if dev}
                <a class="menu dev" class:active={path.current.includes('/gen')}   href="{getPath(`/export/${site.mode}/gen`)}">[gen]</a>
                <a class="menu dev" class:active={path.current.includes('/md')}   href="{getPath(`/export/${site.mode}/md`)}">[md]</a>
            {/if}
        </aside>
        <aside class="flex">
            <Mode/>
            <Theme/>
            <Github/>
            <Version/>
        </aside>
    </nav>
    <nav class="mobile flex">
        <div></div>
        <button onclick={() => show = !show} class:active={show} class="flex">
            {#if show}
                <svg width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"/></svg>
            {:else}
                <svg width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18q-.425 0-.713-.288T3 17q0-.425.288-.713T4 16h16q.425 0 .713.288T21 17q0 .425-.288.713T20 18H4Zm0-5q-.425 0-.713-.288T3 12q0-.425.288-.713T4 11h16q.425 0 .713.288T21 12q0 .425-.288.713T20 13H4Zm0-5q-.425 0-.713-.288T3 7q0-.425.288-.713T4 6h16q.425 0 .713.288T21 7q0 .425-.288.713T20 8H4Z"/></svg>
            {/if}
        </button>
    </nav>
</header>
<MobileNav bind:show/>

<style>
    header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 56px;
        border-bottom: 1px solid var(--grey);
        border-top: 1px solid var(--grey);
        justify-content: flex-start;
        padding: 0 32px;
        backdrop-filter: blur(4px);
        z-index: 2;
    }
    .mobile {
        display: none;
    }
    nav {
        justify-content: space-between;
        width: calc(100% - 240px);
    }
    a {
        text-decoration: none;
    }
    a.logo {
        width: 240px;
    }
    a.logo span {
        font-size: 18px;
        margin-left: 8px;
        letter-spacing: 0.1px;
        font-family: Archivo;
    }
    a.menu {
        margin-left: 8px;
        color: var(--font-grey);
        font-size: 16px;
        transition: color, 0.2s;
        padding: 6px 16px;
        border-radius: 4px;
    }
    a.menu.dev {
        font-family: JetBrains;
        margin: 0 4px;
        font-size: 10px;
        padding: 6px 2px;
    }
    a.menu:hover {
        background: var(--grey-lighten);
    }
    a.menu.active {
        color: var(--primary);
        background: var(--primary-lighten-1);
    }
    button {
        color: var(--font-grey);
        transition: color, 0.2s;
        padding: 0 2px;
        border-radius: 4px;
        height: 32px;
    }
    @media (min-width: 1200px) {
        header {
            padding: 0 96px;
        }
    }
    @media (max-width: 800px) {
        .desktop {
            display: none;
        }
        .mobile {
            display: flex;
        }
        a.logo {
            width: 28%;
        }
        nav {
            width: 72%;
        }
    }
</style>