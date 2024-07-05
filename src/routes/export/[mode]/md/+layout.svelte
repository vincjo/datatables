<script lang="ts">
    import Nav from './Nav.svelte'
    import { url } from 'gros/page'
    import { dev } from '$app/environment'

    let { data, children } = $props()
    let element: HTMLElement = $state(undefined)
    $effect(() => {
        $url
        if (element) element.scrollTop = 0
    })
</script>

{#if dev}
    <Nav nav={data.nav}/>
    <section class="thin-scrollbar" bind:this={element}>

        <div>
            {@render children()}
        </div>

    </section>
{:else}
    <aside class="flex">
        <h1>Markdown generator runs only in dev mode.</h1>
    </aside>
{/if}



<style>
    section {
        position: absolute;
        top: 0;
        bottom: 0;
        left: calc(240px + 32px);
        right: 0;
        overflow-y: auto;
    }
    div {
        max-width: 960px;
        padding: 40px 40px 80px 40px;
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

    aside {
        width: 400px;
        margin: 80px auto;
        border: 2px solid var(--ternary);
        padding: 40px;
        border-radius: 40px;
    }
    h1 {
        text-align: center;
        margin: 0;
        font-family: JetBrains;
        font-size: 24px;
        line-height: 32px;
        color: var(--ternary);
    }
</style>
