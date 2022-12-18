<script>
    import Demo from '$components/Demo.svelte'
	import Main from './Main.svelte'
    export let data
</script>

<h2>A datatable with a sticky header, fixed height, and vertical scrollbar</h2>
<Demo components={data.components} dataset={data.dataset}>
    <Main/>
</Demo>

<!-- <p>
    Using only CSS. The "table container" has to be on position: absolute. ref Datatable.svelte, {`<article class="table">`}<br>
    The {`<thead>`} : position: sticky; inset-block-start: 0;
</p> -->

<style>
    h2{font-size:24px;color:var(--active-dark);font-weight:400;margin:16px 0 8px 0;}
    /* p{color:#616161;} */
</style>