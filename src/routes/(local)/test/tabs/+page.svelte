<script>
    import Main from './Main.svelte'
    import Demo from '$site/components/Demo.svelte'
    export let data
</script>

<h2>Test - tabs + sort</h2>
<div class="qmsldk">
    <Demo components={data.components} dataset={data.dataset} scrollY={false}>
        <Main />
    </Demo>
</div>


<style>
    h2 {
        font-size: 24px;
        color: var(--secondary);
        font-weight: 400;
        margin: 16px 0 8px 0;
    }
    .qmsldk :global(article.table) {
        background: #fff;
        padding: 24px;
    }
</style>
