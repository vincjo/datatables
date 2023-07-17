<script>
    import Nav from './Nav.svelte'
    export let data
</script>


<Nav data={data.parser}/>
<section>
    <div>
        <slot/>
    </div>
</section>

<style>
    section {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 24vw;
        right: 0;
        overflow-y: auto;
    }
    div {
        max-width: 1200px;
        min-width: 960px;
        padding: 40px 160px 80px 64px;
    }
</style>
