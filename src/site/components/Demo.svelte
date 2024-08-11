<script lang="ts">
    import { fade } from 'svelte/transition'
    import type { Snippet } from 'svelte'
    import Code from './Demo_Code.svelte'
    import Data from './Demo_Data.svelte'
    let current: 'demo' | 'code' | 'data' = $state('demo')
    let { children, data }: { children: Snippet, data: any } = $props()
</script>

<section in:fade>
    <nav class="flex">
        <button class:active={current === 'demo'} onclick={() => (current = 'demo')}>Demo</button>
        <button class:active={current === 'code'} onclick={() => (current = 'code')}>Code</button>
        <button class:active={current === 'data'} onclick={() => (current = 'data')}>Data</button>
    </nav>
    {#if current === 'demo'}
        <article class="bg-darken">
            {@render children()}
        </article>
    {:else if current === 'code'}
        <Code hasNav={data.hasNav} components={data.components}/>
    {:else if current === 'data'}
        <Data dataset={data.dataset}/>
    {/if}
</section>

<style>
    section {
        height: inherit;
        max-width: 960px;
    }
    nav {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        margin-bottom: 8px;
    }
    nav button {
        font-size: 16px;
        color: var(--font-grey);
        line-height: 32px;
        border-radius: 0;
        padding: 8px 0 0 0;
        margin: 0 24px 0 16px;
        font-weight: bold;
        border-bottom: 2px solid transparent;
    }
    nav button.active {
        color: var(--primary);
        border-bottom: 2px solid var(--primary);
    }
    article {
        border-radius: 8px;
        position: relative;
        background: var(--bg);
        border: 1px solid var(--grey);
        min-width: 480px;
        padding: 16px;
        width: fit-content;
        overflow: auto;
    }
</style>
