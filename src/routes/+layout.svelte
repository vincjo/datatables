<script>
    import Nav from './Nav.svelte'
    import Github from './Github.svelte'
</script>

<Github/>

<nav>
    <Nav/>
</nav>
<section>
    <article>
        <slot/>
    </article>
</section>



<style>
    nav{position:absolute;top:0;bottom:0;left:0;width:30%;display:flex;justify-content:flex-end;border-right:1px solid #e0e0e0;}
    section{position:absolute;top:0;bottom:0;right:0;width:70%;display:flex;justify-content:flex-start;overflow-y:auto;}
    article{padding:32px;width:1080px;min-width:800px;min-height:100vh;background:#fff;}

</style>