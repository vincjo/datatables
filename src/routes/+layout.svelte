<script>
    import Nav from './Nav.svelte'
    import Github from './Github.svelte'
    import { afterNavigate } from "$app/navigation";
  
    let element

    afterNavigate(() => {
        if (element) element.scrollTop = 0
    })

</script>

<Github/>

<nav>
    <Nav/>
</nav>
<section bind:this={element}>
    <article>
        <slot/>
    </article>
</section>



<style>
    nav{position:absolute;top:0;bottom:0;left:0;width:23vw;display:flex;justify-content:flex-end;border-right:1px solid #e0e0e0;}
    section{position:absolute;top:0;bottom:0;right:0;width:77vw;display:flex;justify-content:flex-start;overflow-y:auto;}
    article{padding:32px;width:1080px;min-width:800px;min-height:100vh;background:#fff;}

    @media (max-width: 800px) { 
        section{position:unset;width:100%;padding:16px 24px;}
        article{padding:0;min-width:200px;}
        nav{display:none;}
    }
</style>