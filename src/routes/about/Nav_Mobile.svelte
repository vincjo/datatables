<script lang="ts">
    import { getPath, path } from 'gros/page'
    import { clickOutside } from 'gros/action'
    import { fly, fade }    from 'svelte/transition'
    import { site } from '$site'
    let { nav }: { nav: any } = $props()
    let show = $state(false)
    const close = () => show = false
</script>

<nav class="flex">
    <button onclick={() => show = true} class="flex">
        <svg width="18px" height="18px" viewBox="0 0 24 24"><path fill="currentColor" d="M15.616 20q-.402 0-.701-.299t-.3-.701v-4.384q0-.402.3-.701t.7-.3H20q.402 0 .701.3t.299.7V19q0 .402-.299.701T20 20zM3 17.308v-1h8.23v1zm12.616-6.924q-.402 0-.701-.299t-.3-.7V5q0-.402.3-.701t.7-.299H20q.402 0 .701.299T21 5v4.385q0 .401-.299.7t-.701.3zM3 7.692v-1h8.23v1z"/></svg>
        <span>Menu</span>
    </button>
    <b>About</b>
</nav>

{#if show}
    <section transition:fade|global={{ duration: 400 }}></section>
{/if}

{#if show}
    <article 
        class="thin-scrollbar" 
        in:fly|global={{ duration: 400, x: -200 }} 
        out:fly|global={{ duration: 400, x: -200, delay: 200 }} 
        use:clickOutside={close}
    >
        {#each nav as item}
            <a href="{getPath(`/about/${item.page}`)}" class:active={path.current.includes(item.page)} onclick={close}>
                <b>{item.title}</b>
            </a>
            <div class="divider"></div>
        {/each}
    </article>
{/if}

<style>
    nav {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 48px;
        justify-content: space-between;
        border-bottom: 1px solid var(--grey);
        background: var(--bg);
        padding: 0 16px 0 16px;
    }
    nav b {
        color: var(--font-grey);
        font-weight: normal;
        font-family: Archivo;
    }
    button {
        color: var(--font-grey);
        transition: color, 0.2s;
        padding: 0 2px;
        border-radius: 4px;
        height: 32px;
    }
    svg {
        margin-right: 8px;
    }
    section {
        position: fixed;
        top: 0; bottom: 0; left: 0; right: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 6;
    }
    article {
        position: fixed;
        top: 0;
        bottom: 0px;
        left: 0;
        width: 80%;
        max-width: 240px;
        overflow-y: auto;
        border-top: 1px dotted var(--grey);
        background: var(--bg);
        padding: 32px 24px 40px 24px;
        z-index: 7;
    }
    a {
        display: block;
        text-decoration: none;
        padding: 4px 12px;
        margin-right: 8px;
        transition: all, 0.2s;
        border-radius: 8px;
        color: var(--font);
    }
    a:hover {
        background: var(--primary-lighten-1);
    }
    a.active {
        background: var(--primary-lighten-2);
    }
    a b {
        display: block;
        font-weight: 400;
        font-size: 17px;
        padding-bottom: 2px;
        font-family: Archivo;
        font-weight: bold;
    }
    a.active b {
        color: var(--primary);
    }
    div.divider {
        width: 96%;
        height: 8px;
        border: none;
        border-top: 1px solid var(--grey);
        margin: 8px auto 0 auto;
    }
    @media (min-width: 800px) {
        nav {
            display: none;
        }
    }
    .divider {
        border-bottom: 1px dotted var(--grey);
        margin: 0 12px 0 4px;
    }
</style>