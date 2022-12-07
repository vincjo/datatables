<script>
    import Nav from '$components/Nav.svelte'
    import highlight from 'svelte-highlight/styles/agate'
</script>

<svelte:head>
  {@html highlight}
</svelte:head>

<Nav/>
<section>
    <slot/>
</section>

<aside></aside>

<style>
    section{position:absolute;top:0;right:0;bottom:0;left:240px;padding:32px;min-width:800px;background:#fff;overflow:auto;}

</style>