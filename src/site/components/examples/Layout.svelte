<script lang="ts">
    import Nav from './Nav.svelte'
    import type { Snippet } from 'svelte'
    import MobileNav from './Nav_Mobile.svelte'
    import { path } from 'gros/page'

    type Props = { nav: { title: string, page: string, description: string, tag: string[] }[], children: Snippet }
    let { nav, children }: Props = $props()    
    let element: HTMLElement
    $effect(() => {
        path.current
        if (element) element.scrollTop = 0
    })
</script>


<Nav {nav}/>
<MobileNav {nav}/>
<section class="thin-scrollbar" bind:this={element}>
    <article class="md">
        {@render children()}
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
        padding: 0 72px;
        color: var(--font);
    }
    article {
        margin: 0;
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
            top: 48px;
            padding: 0 16px;
        }
    }
</style>