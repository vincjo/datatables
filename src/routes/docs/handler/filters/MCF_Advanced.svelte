<script>
    import Demo from '$site/components/Demo.svelte'
    import Main from './MCF_Main.svelte'
    export let data
</script>





<Demo components={data.components} dataset={data.dataset} scrollY={true}>
    <Main />
</Demo>