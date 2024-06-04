<script lang="ts">
    import type { Method, Property } from '$site/api'
    import Prism from 'prismjs'
    import 'prism-svelte'
    import 'prismjs/components/prism-typescript.js'

    let { methods, properties }: { methods: Method[], properties: Property[] } = $props()

</script>

<section>
    {#each properties as property}
    <article class="flex">
        <span class="key">prop</span>
        <pre><code>{@html Prism.highlight(property.name + ': ' + property.type, Prism.languages.typescript)}</code></pre>
    </article>
    {/each}
    {#each methods as method}
    <article class="flex">
        <span class="key">method</span>
        <pre><code>{@html Prism.highlight(method.text, Prism.languages.typescript)}</code></pre>
    </article>
    {/each}
</section>

<style>
    section {
        max-width: 800px;
        border: 1px solid var(--grey);
        border-radius: 8px;
        margin: 24px 0;
        padding: 16px 24px;
        color: var(--font);
    }
    article {
        font-family: JetBrains;
        padding: 8px;
        border-bottom: 1px solid var(--grey-lighten);
    }
    article:last-child {
        border: none;
    }
    span.key {
        width: 64px;
        color: var(--font-grey);
        margin-right: 4px;
    }
    pre {
        margin: 0;
        background: var(--bg-code);
        padding: 4px 16px;
        font-size: 16px;
        border-radius: 6px;
    }
    code {
        background: var(--bg-code);
    }
</style>