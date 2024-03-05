<script>
    import Nav from './Nav.svelte'
    import { url } from 'gros/page'

    export let nav
    let element
    const scrollTop = () => {
        if (element) {
            element.scrollTop = 0
        }
    }
    $: $url, scrollTop()
</script>

<Nav {nav}/>
<section  class="thin-scrollbar" bind:this={element}>
    <article class="md">
        <slot/>
    </article>
</section>

<style>
    section {
        position: absolute;
        left: calc(240px + 32px);
        top: 0;
        bottom: 0;
        right: 0;
        padding: 32px 72px;
        color: var(--font);
        overflow-y: auto;
    }
    article {
        max-width: 800px;
    }
    @media (max-width: 800px) {
        section {
            left: 0;
            padding: 32px 24px;
        }
    }
    @media (min-width: 1200px) {
        section {
            left: calc(240px + 96px);
        }
    }
</style>