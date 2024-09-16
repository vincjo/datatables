<script lang="ts">
    import Nav from './Nav.svelte'
    import MobileNav from './Nav_Mobile.svelte'
    import { createURL } from 'gros/page'
    import type { Snippet } from 'svelte'

    const url = createURL()

    let { nav, children }: { nav: any, children: Snippet } = $props()
    let element: HTMLElement
    $effect(() => {
        $url
        if (element) element.scrollTop = 0
    })
</script>

<Nav {nav}/>
<MobileNav {nav}/>
<section  class="thin-scrollbar" bind:this={element}>
    <article class="md">
        {@render children()}
    </article>
</section>

<style>
    section {
        position: absolute;
        left: calc(240px + 32px);
        top: 0;
        bottom: 0;
        right: 0;
        padding: 32px 64px;
        color: var(--font);
        overflow-y: auto;
    }
    article {
        max-width: 800px;
    }
    @media (max-width: 800px) {
        section {
            left: 0;
            top: 48px;
            padding: 32px 24px;
        }
    }
    @media (min-width: 1200px) {
        section {
            left: calc(240px + 96px);
        }
    }
</style>