<script>
    import Nav from './Nav.svelte'
    export let data
</script>


<Nav data={data.parser}/>
<section class="thin-scrollbar">
    <div>
        <slot/>
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
