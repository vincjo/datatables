<script lang="ts">
    import Nav from './Nav.svelte'
    import { url } from 'gros/page'

    export let nav: { title: string, page: string, description: string, tag: string[] }[]

    let element: HTMLElement
    const scrollTop = () => {
        if (element) {
            element.scrollTop = 0
        }
    }
    $: $url, scrollTop()
</script>


<Nav {nav}/>
<section class="thin-scrollbar" bind:this={element}>
    <article class="md">
        <slot/>
    </article>
</section>

<style>
    section {
        position: absolute;
        top: 0;
        bottom: 0;
        left: calc(240px + 32px);
        right: 0;
        overflow-y: auto;
        padding: 0 40px;
        color: var(--font);
    }
    article {
        margin: 0 auto;
        margin-bottom: 80px;
        max-width: 1080px;
    }
    @media (min-width: 1200px) {
        section {
            left: calc(240px + 96px);
        }
    }
    @media (max-width: 800px) {
        section {
            left: 0;
        }
    }
</style>