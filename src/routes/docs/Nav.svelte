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
        padding-right: 32px;
        overflow-y: scroll;
        padding: 16px 0 24px 36px;
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
        margin-top: 12px;
    }
    a:hover {
        text-decoration: underline;
    }
    a.active {
        text-decoration: none;
        color: var(--primary);
        font-weight: bold;
    }
</style>