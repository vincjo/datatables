<script>
    import { page } from '$app/stores'
    import { fade } from 'svelte/transition'
</script>

<section>
    <article>
        {#if $page.url.pathname !== '/datatables.v0/'}
            <aside transition:fade={{ duration: 100 }}>
                <img src="./logo-grey.svg" alt="logo" />
                <div>
                    <h1>svelte<br />simple<br />datatables</h1>
                </div>
            </aside>
        {/if}
    </article>

    <h2 class:active={$page.url.pathname === '/datatables.v0/'}>
        <a href="/">home</a>
    </h2>
    <h2 class:active={$page.url.pathname.includes('/demo')}>
        <a href="/datatables.v0/demo">demo</a>
    </h2>
    <h2 class:active={$page.url.pathname.includes('/settings')}>
        <a class:active={$page.url.pathname === '/datatables.v0/settings'} href="/datatables.v0/settings">settings</a>
    </h2>
</section>

<style>
    section {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 240px;
        background: #fff;
        z-index: 1;
        padding: 40px 0 0 40px;
        overflow-y: auto;
    }

    article {
        height: 88px;
    }
    aside {
        display: flex;
        justify-content: start;
        margin: 0;
        height: 48px;
    }
    aside h1 {
        font-size: 16px;
        line-height: 15px;
        text-align: left;
        font-weight: 400;
        margin: 0;
        color: #333;
    }
    aside img {
        width: 48px;
        margin: 0 8px;
    }

    h2 {
        color: #333;
        font-weight: 200;
        margin: 0;
        font-size: 32px;
        line-height: 40px;
        transition: all, 0.1s;
    }
    h2:hover {
        font-weight: 600;
        color: #676778;
    }
    h2.active {
        color: #bdbdbd;
        font-weight: 600;
    }
    h2 a {
        text-decoration: none;
    }
</style>
