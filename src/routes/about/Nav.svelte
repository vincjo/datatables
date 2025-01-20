<script lang="ts">
    import { path } from 'gros/page'
    type Props = { nav: { title: string, page: string, icon: string }[] }
    let { nav }: Props = $props()
</script>


<nav>
    <section class="thin-scrollbar">
        {#each nav as item}
            <a href="{path.get(`/about/${item.page}`)}" class={[ 'flex', { active: path.name.includes(item.page) }]}>
                <i class="icon">{@html item.icon ?? ''}</i>
                <b>{item.title}</b>
            </a>
            <div class="divider"></div>
        {/each}
    </section>
</nav>


<style>
    nav {
        position: absolute;
        top:0;
        bottom: 0;
        left: 32px;
        width: 240px;
        padding: 24px 16px 24px 0;
        border-right: 1px solid var(--grey);
    }

    section {
        position: absolute;
        top: 24px;
        bottom: 24px;
        left: 0;
        right: 16px;
        overflow-y: auto;
        padding-top: 8px;
    }
    a {
        text-decoration: none;
        padding: 8px 12px;
        margin-right: 8px;
        transition: all, 0.2s;
        border-radius: 8px;
        color: var(--font);
    }
    a:hover {
        background: var(--primary-lighten-1);
    }
    a.active {
        background: var(--primary-lighten-2);
    }
    a b {
        display: block;
        font-weight: 400;
        font-size: 17px;
        padding-bottom: 2px;
        font-weight: bold;
    }
    a.active b {
        color: var(--primary);
    }
    i.icon {
        width: 24px;
        height: 24px;
        margin-right: 8px;
    }
    a.active i.icon {
        color: var(--primary);
    }
    div.divider {
        width: 96%;
        height: 8px;
        border-top: 1px solid var(--grey);
        margin: 8px auto 0 auto;
    }
    @media (min-width: 1200px) {
        nav {
            left: 96px;
        }
    }
    @media (max-width: 800px) {
        nav {
            display: none;
        }
    }
</style>