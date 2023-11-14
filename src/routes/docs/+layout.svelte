<script>
    import Nav from './Nav.svelte'
</script>

<Nav/>
<section  class="thin-scrollbar">
    <article>
        <slot/>
    </article>
</section>

<style>
    section {
        position: absolute;
        left: 240px;
        top: 0;
        bottom: 0;
        right: 0;
        padding: 32px 64px;
        color: var(--font);
        overflow-y: auto;
    }
    article {
        max-width: 720px;
    }
    @media (max-width: 800px) {
        section {
            left: 0;
        }
    }
</style>