<script>
    import Header from './Header.svelte'
    import Nav from './Nav.svelte'
</script>

<main>
    <Nav />
    <Header />
    <section>
        <article>
            <slot />
        </article>
    </section>
</main>

<style>
    section {
        position: absolute;
        left: 240px;
        bottom: 0;
        top: 0px;
        right: 0;
        background-color: white;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        padding-bottom: 80px;
        padding-left: 56px;
        background: #fff;
    }
    article {
        max-width: 960px;
        padding-bottom: 80px;
    }
</style>
