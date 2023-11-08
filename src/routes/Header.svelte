<script>
    import { darkMode } from '$site/utils'
    import Sun from '~icons/material-symbols-light/sunny-outline-rounded'
    import Moon from '~icons/material-symbols-light/dark-mode-outline-rounded'
    import Github from './Header_Github.svelte'
    import Logo from '$site/Logo.svelte'
    import { getPath, url } from 'gros/page'
</script>




<header class="flex">
    <nav class="flex">
        <a class="flex logo" href="{getPath('/')}">
            <Logo height="28px"/>
            <span class="alt-font">svelte simple datatables</span>
        </a>
        <a class="menu" class:active={$url.indexOf('docs') > -1} href="{getPath('/docs')}">Documentation</a>
        <a class="menu" class:active={$url.indexOf('api') > -1} href="{getPath('/api')}">API</a>
    </nav>

    <div/>

    <aside class="flex">
        <Github/>
        <button on:click={() => $darkMode = !$darkMode} class="btn">
            {#if $darkMode}
                <Moon/>
            {:else}
                <Sun/>
            {/if}
        </button>
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
    a.menu {
        margin-left: 32px;
        color: var(--font-grey);
        font-size: 16px;
        transition: color, 0.2s;
    }
    a.menu:hover {
        margin-left: 32px;
        color: var(--primary-lighten);
        font-size: 16px;
        transition: color, 0.2s;
    }
    a.menu.active {
        color: var(--primary);
    }
    button {
        border-radius: 4px;
        padding: 0;
        width: 40px;
        height: 32px;
    }
    button:hover {
        background: var(--grey);
    }

    @media (min-width: 1200px) {
        header {
            padding: 0 96px;
        }
    }
    @media (max-width: 640px) {
        nav {
            display: none;
        }
    }
</style>