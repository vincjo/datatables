<script lang="ts">
    import { clickOutside } from 'gros/action'
    import { fly, fade }    from 'svelte/transition'
    import Key from './Nav_Key.svelte'
    let { nav }: { nav: any } = $props()
    let show = $state(false)
    let active = $state('API')
    const close = () => show = false
    const { properties, methods, types } = nav
</script>

<nav class="flex">
    <button onclick={() => show = true} class="flex">
        <svg width="18px" height="18px" viewBox="0 0 24 24"><path fill="currentColor" d="M15.616 20q-.402 0-.701-.299t-.3-.701v-4.384q0-.402.3-.701t.7-.3H20q.402 0 .701.3t.299.7V19q0 .402-.299.701T20 20zM3 17.308v-1h8.23v1zm12.616-6.924q-.402 0-.701-.299t-.3-.7V5q0-.402.3-.701t.7-.299H20q.402 0 .701.299T21 5v4.385q0 .401-.299.7t-.701.3zM3 7.692v-1h8.23v1z"/></svg>
        <span>Menu</span>
    </button>
    <b>{active}</b>
</nav>

{#if show}
    <section transition:fade|global={{ duration: 400 }}></section>
{/if}

{#if show}
    <article in:fly|global={{ duration: 400, x: -200 }} out:fly|global={{ duration: 400, x: -200, delay: 200 }} class="thin-scrollbar" use:clickOutside={close}>
        <Key {close} data={properties} key={'properties'}/>
        <Key {close} data={methods}    key={'methods'}/>
        <Key {close} data={types}      key={'types'}/>
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
        padding: 0 40px 0 16px;
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
        overflow-y: auto;
        border-top: 1px dotted var(--grey);
        background: var(--bg);
        padding: 32px 24px 40px 24px;
        z-index: 7;
    }
    @media (min-width: 800px) {
        nav {
            display: none;
        }
    }
</style>