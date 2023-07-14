<script>
    import Demo from '$site/components/Demo.svelte'
    import Main from './Main.svelte'
    export let data
</script>


<section>
    <h2>Multiple criteria filter</h2>

    <Demo components={data.components} dataset={data.dataset} scrollY={true}>
        <Main />
    </Demo>
</section>


<style>
    section :global(h1) {
        font-size: 40px;
        color: var(--primary);
        font-weight: 400;
        margin: 16px 0 8px 0;
    }
    section :global(h2) {
        font-size: 32px;
        color: var(--secondary);
        font-weight: 400;
        margin: 16px 0 8px 0;
    }
</style>
