<script>
    import { url, getPath } from 'gros/page'
</script>


<header class="flex z-depth-2">
    <a href="/datatables/home">
        <aside>
            <img src="/datatables/logo.svg" alt="logo" />
            <div class="alt-font">
                svelte<br />simple<br />datatables
            </div>
        </aside>
    </a>
    <article class="flex">
        <nav class="flex">
            <a class:active={$url.includes('docs')} href="{getPath('/home')}">Docs</a>
            <a class:active={$url.includes('examples')} href="{getPath('/examples')}">Examples</a>
            <a class:active={$url.includes('api')} href="{getPath('/api-reference')}">API</a>
        </nav>
        <a href="https://github.com/vincjo/datatables" class="flex">
            <img alt="github logo" src="/datatables/github.svg" /><span>Github</span>
        </a>
    </article>
</header>


<style>
    header {
        position: fixed;
        justify-content: space-between;
        top: 0; left: 0; right: 0;
        height: 56px;
        background: rgba(255,255,255,0.6);
        backdrop-filter: blur(4px);
        z-index: 2;
        padding: 0 24px;
    }
    header a {
        text-decoration: none;
    }
    a.flex img {
        float: left;
        padding: 8px 8px;
        width: 44px;
    }
    span {
        padding-right: 8px;
    }

    aside {
        display: flex;
        justify-content: flex-start;
        margin: 0;
        height: 40px;
        width: 23vw;
        margin-top: 8px;
        padding: 0 24px;
    }
    aside div {
        font-size: 12.5px;
        line-height: 12.5px;
        text-align: left;
        font-weight: 400;
        margin: 0;
        color: #333;
        height: 40px;
    }
    aside img {
        width: 48px;
        margin: 0 4px;
    }
    nav {
        margin-right: 40px;
    }
    nav a {
        display: inline-block;
        margin: 0 4px;
        font-weight: 400;
        padding: 8px 16px;
        border-radius: 4px;
    }
    nav a:hover {
        color: var(--primary); 
    }
    nav a.active {
        background: var(--primary-lighten-1);
        color: var(--primary-darken); 
    }
</style>