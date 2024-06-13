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
    <nav transition:slide={{ duration: 120 }}>
        <a class="menu" class:active={$page.url.pathname.indexOf('/docs') > -1}       href="{site.getPath(`/${site.mode}/docs/getting-started/intro`)}" onclick={close}>Docs</a>
        <a class="menu" class:active={$page.url.pathname.indexOf('/examples') > -1}   href="{site.getPath(`/${site.mode}/examples/hello-world`)}" onclick={close}>Examples</a>
        <a class="menu" class:active={$page.url.pathname.indexOf('/api') > -1}        href="{site.getPath(`/${site.mode}/api`)}" onclick={close}>API</a>

        <div class="divider"></div>

        <Mode isMobile/>
        <div class="divider-16"></div>
        <Theme isMobile/>
        <div class="divider-16"></div>
        <Github isMobile/>
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
    }
    a {
        border-bottom: 1px solid var(--grey);
        display: flex;
        align-items: center;
        text-decoration: none;
        height: 56px;
        padding-left: 8px;
        font-weight: bold;
        letter-spacing: 0.1em;
        font-family: Archivo;
        font-size: 18px;
    }
    a.active {
        color: var(--primary);
        font-weight: bold;
    }
    .divider {
        margin-top: 64px;
    }
    .divider-16 {
        margin-bottom: 16px;
    }
</style>