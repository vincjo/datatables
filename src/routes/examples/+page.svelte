<script>
    import { data } from './examples'
    import { DataHandler } from '$lib'
    import { getPath } from 'gros/page'
    const handler = new DataHandler(data)
    const rows = handler.getRows()
    let value = ''
</script>

<header>
    <input type="text" bind:value on:input={() => handler.search(value)}>
</header>

<section class="flex">
    {#each $rows as example}
        <a href={getPath(`/examples/${example.page}`)} class="z-depth-1">
            <h1>{example.title}</h1>
            <p>{example.description}</p>
        </a>
    {/each}
</section>

<style>
    section {
        padding: 24px 0;
        flex-wrap: wrap;
    }
    a {
        border: 1px solid var(--grey-lighten);
        background: var(--bg);
        text-decoration: none;
        padding: 8px 24px;
        margin: 16px 16px 16px 0;
        border-radius: 8px;
        width: 320px;
        height: 112px;
        transition: all, 0.2s;
    }
    a:hover {
        background: var(--primary-lighten-1);
    }
    h1, p {
        margin: 0;
        line-height: 20px;
    }
    h1 {
        font-size: 18px;
        color: var(--primary);
        font-weight: 400;
        margin: 8px 0 12px 0;
    }
    p {
        font-size: 16px;
    }
</style>