<script>
    import Nav from './Nav.svelte'
</script>

<section>
    <Nav/>
    <article>
        <slot/>
    </article>
</section>

<style>
    article {
        position: absolute;
        left: 240px;
        top: 0;
        padding: 32px 64px;
        color: var(--font);
    }
</style>