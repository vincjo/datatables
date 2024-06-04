<script>
    import Nav from './Nav.svelte'
    import { url } from 'gros/page'
    let { data, children } = $props()

    let element
    const scrollTop = () => {
        if (element) {
            element.scrollTop = 0
        }
    }
    $effect(() => {
        $url
        scrollTop()
    })
</script>


<Nav nav={data.nav}/>
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
</style>
