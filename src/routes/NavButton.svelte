<script>
    import Nav from './Nav.svelte';
    import { fade } from 'svelte/transition';
    let active = false;
</script>

<button on:click={() => (active = !active)} class:active>
    <i class="micon">{active ? 'close' : 'menu'}</i>
</button>

{#if active}
    <section transition:fade={{ duration: 200 }} on:click|self={() => (active = false)} on:keyup>
        <Nav />
    </section>
{/if}

<style>
    section {
        position: fixed;
        z-index: 20;
        width: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
    }
    button {
        position: fixed;
        z-index: 21;
        top: 8px;
        left: 8px;
        color: var(--primary);
        background: var(--primary-lighten-1);
        padding: 2px;
        border-radius: 50%;
        width: 40px;
        height: 40px;
    }
    button.active {
        left: 190px;
    }
    @media (min-width: 800px) {
        button {
            display: none;
        }
    }
</style>
