<script>
    import { fade } from 'svelte/transition';
    import CopyButton from './CopyButton.svelte';
    import DemoCode from './DemoCode.svelte';
    import Prism from 'prismjs';
    export let dataset;
    export let components;
    export let scrollY = true;
    export let width = 'auto';
    let current = 'result';
</script>

<div in:fade>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <ul>
        <li class:active={current === 'result'} on:click={() => (current = 'result')}>Result</li>
        <li class:active={current === 'code'} on:click={() => (current = 'code')}>Code</li>
        <li class:active={current === 'data'} on:click={() => (current = 'data')}>Data</li>
    </ul>
    {#if current === 'result'}
        <article
            class="table"
            in:fade={{ duration: 200 }}
            style="max-width:{width};"
            class:scroll-y={scrollY}
        >
            <slot />
        </article>
    {:else if current === 'code'}
        <article class="code">
            <DemoCode {components} />
        </article>
    {:else}
        <article class="code thin-scrollbar-darken">
            <CopyButton code={dataset} />
            <pre class="language-javascript">
{@html Prism.highlight(dataset, Prism.languages.javascript)}
                </pre>
        </article>
    {/if}
</div>

<style>
    div {
        height: inherit;
        max-width: 960px;
    }
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        margin-bottom: 8px;
    }
    li {
        display: block;
        font-size: 16px;
        color: #676778;
        line-height: 32px;
        padding: 8px 0 0 0;
        margin: 0 24px 0 16px;
        font-weight: bold;
        border-bottom: 2px solid transparent;
        transition: color, 0.1s;
        cursor: pointer;
    }
    li.active {
        color: var(--primary);
        border-bottom: 2px solid var(--primary);
    }

    article {
        border-radius: 8px;
        position: relative;
    }

    article.table {
        border: 1px solid #e0e0e0;
        max-width: 800px;
    }
    article.table.scroll-y {
        height: 480px;
    }
    article.code {
        height: 480px;
        background: var(--hljs);
        overflow: auto;
    }
</style>
