<section>
    <slot />
</section>

<style>
    section {
        margin: 0;
        max-width: 800px;
        padding-bottom: 200px;
    }
    section :global(p) {
        font-size: 16px;
        font-family: Helvetica, Arial, sans-serif;
    }
    section :global(code) {
        background: #eee;
        padding: 1px 2px;
        border-radius: 2px;
        border: 1px solid #bdbdbd;
    }
    @media (max-width: 800px) {
        section {
            margin: 0;
        }
    }
</style>
