<script lang="ts">
    import Nav from './Nav.svelte'
    import MobibleNav from './Nav_Mobile.svelte'
    import { path } from 'gros/page'

    interface Props {
        data: import('./$types.js').LayoutServerData,
        children: import('svelte').Snippet
    }
    let { data, children }: Props = $props()

    let element: HTMLElement
    $effect(() => {
        path.current
        if (element) element.scrollTop = 0
    })

</script>

<svelte:head>
    <title>svelte simple datatables - api</title>
    <meta name="description" content="API documentation for svelte simple datatables">
</svelte:head>

{#key data.nav}
    <Nav nav={data.nav}/>
    <MobibleNav nav={data.nav}/>
{/key}

<section class="thin-scrollbar" bind:this={element}>
    <div>
        {@render children()}
    </div>
</section>

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
        padding: 40px 72px 80px 72px;
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
        }
        div {
            padding: 32px 16px;
        }
    }
</style>
