<section>
    <slot />
</section>

<style>
    section {
        margin: 0 4%;
        max-width: 800px;
        padding-bottom: 200px;
    }
    section :global(h1) {
        font-size: 18px;
        color: var(--primary);
        font-family: Arial, Helvetica;
        font-weight: normal;
        margin: 0 0 16px 0;
    }
    section :global(h2) {
        font-size: 48px;
        color: var(--secondary);
        font-weight: 400;
        margin: 24px 0 8px 0;
        line-height: 40px;
    }
    section :global(p) {
        font-size: 16px;
        font-family: Helvetica, Arial, sans-serif;
    }
    @media (max-width: 800px) {
        section {
            margin: 0;
        }
    }
</style>
