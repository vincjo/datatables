<script>
    import Demo from '$components/Demo.svelte';
    import Main from './Main.svelte';
    export let data;
</script>

<h2>A datatable with a sticky header, fixed height, and vertical scrollbar</h2>
<Demo components={data.components} dataset={data.dataset}>
    <Main />
</Demo>

<style>
    h2 {
        font-size: 24px;
        color: var(--secondary);
        font-weight: 400;
        margin: 16px 0 8px 0;
    }
    /* p{color:#616161;} */
</style>
