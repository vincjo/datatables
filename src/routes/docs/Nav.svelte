<script>
    import { getPath, url } from 'gros/page'
    import { items } from './Nav'
</script>

<nav class="thin-scrollbar">
    {#each items as item}
        <h1>{item.title}</h1>
        {#each item.links as link}
            <a class:active={$url.indexOf(link.path) > -1} href="{getPath(link.path)}">{link.name}</a>
        {/each}
    {/each}
</nav>


<style>
    nav {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 240px;
        overflow-y: scroll;
        padding: 16px 0 24px 36px;
        border-left: 1px solid var(--grey);
    }
    h1 {
        font-weight: bold;
        margin-top: 24px;
        font-size: 15px;
        margin-bottom: 0;
        color: var(--font);
    }
    a {
        display: block;
        text-decoration: none;
        color: var(--font-grey);
        margin-top: 4px;
        margin-right: 8px;
        padding: 4px 8px;
        border-radius: 4px;
        transition: background, 0.2s;
    }
    a:hover {
        background: var(--primary-lighten-1);
    }
    a.active {
        text-decoration: none;
        color: var(--primary);
        font-weight: bold;
        background: var(--primary-lighten-1)
    }

    @media (max-width: 800px) {
        nav {
            display: none;
        }
    }
</style>