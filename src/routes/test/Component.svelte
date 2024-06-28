<script>
    let { footer, header, children, content } = $props()
</script>

<section>
    <header>
        {@render header()}
    </header>

    <article>
        {@render children()} {content}
    </article>

    <footer>
        {@render footer()}
    </footer>

</section>

<style>
    section {
        border-radius: 8px;
    }
    header, article, footer {
        height: 56px;
    }
    header {
        background: blueviolet;
    }
    footer {
        background: blueviolet
    }
    article {
        background: burlywood;
    }
</style>