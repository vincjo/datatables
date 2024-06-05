<script lang="ts">
    import Github   from './Header_Github.svelte'
    import Theme    from './Header_Theme.svelte'
    import Mode     from './Header_Mode.svelte'
    import Logo     from '$site/Logo.svelte'
    import { site } from '$site/utils'
    import { page } from '$app/stores'
    import { dev }  from '$app/environment'
</script>

<header class="flex">
    <nav class="flex">
        <a class="flex logo" href="{site.getPath('/')}">
            <Logo height="28px"/>
            <span class="alt-font">svelte simple datatables</span>
        </a>
        <a class="menu" class:active={$page.url.pathname.indexOf('/docs') > -1}       href="{site.getPath(`/${site.mode}/docs/getting-started/intro`)}">Docs</a>
        <a class="menu" class:active={$page.url.pathname.indexOf('/api') > -1}        href="{site.getPath(`/${site.mode}/api`)}">API</a>
        <a class="menu" class:active={$page.url.pathname.indexOf('/examples') > -1}   href="{site.getPath(`/${site.mode}/examples/hello-world`)}">Examples</a>

        {#if dev}
            <a class="menu" class:active={$page.url.pathname.indexOf('/gen') > -1}   href="{site.getPath(`/${site.mode}/gen`)}">[gen]</a>
            <a class="menu" class:active={$page.url.pathname.indexOf('/md') > -1}   href="{site.getPath(`/${site.mode}/md`)}">[md]</a>
        {/if}
    </nav>
    <div></div>
    <aside class="flex">
        <Mode/>
        <Theme/>
        <Github/>
    </aside>
</header>


<style>
    header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 56px;
        border-bottom: 1px solid var(--grey);
        border-top: 1px solid var(--grey);
        background: var(--bg);
        color: var(--font);
        justify-content: space-between;
        padding: 0 32px;
        backdrop-filter: blur(4px);
    }
    a {
        text-decoration: none;
    }
    a.logo span {
        font-size: 18px;
        margin-left: 8px;
        letter-spacing: -0.4px;
    }
    a.logo {
        margin-right: 16px;
    }
    a.menu {
        margin-left: 16px;
        color: var(--font-grey);
        font-size: 16px;
        transition: color, 0.2s;
        padding: 6px 16px;
        border-radius: 4px;
    }
    a.menu:hover {
        font-size: 16px;
    }
    a.menu.active {
        color: var(--primary);
        background: var(--primary-lighten-1);
    }

    @media (min-width: 1200px) {
        header {
            padding: 0 96px;
        }
    }
    @media (max-width: 800px) {
        nav {
            display: none;
        }
    }
</style>