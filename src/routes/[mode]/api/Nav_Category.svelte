<script>
    import { DataHandler } from '$lib/client'
    import { getPath } from 'gros/page'
    import { mode } from '$site/utils'
    import { page } from '$app/stores'
    export let data = []
    export let category
    export let value

    const handler = new DataHandler(data)
    const rows = handler.getRows()
    $: value, handler.search(value)
</script>


<aside class={category}>
    <h1 class="alt-font">{category}</h1>
    <ul>
        {#each $rows as row}
            <a href="{getPath(`/${$mode}/api/${category}~${row.name}`)}">
                <li class:deprecated={row.isDeprecated} class:active={row.name === $page.params.slug?.split('~')[1]}>
                    <span>{row.name}</span>
                </li>
            </a>
        {/each}
    </ul>
</aside>



<style>
    h1 {
        font-size: 18px;
        font-weight: 400;
        margin: 16px 0 8px 0;
        text-transform: uppercase;
        font-weight: 400;
    }
    ul {
        list-style-type: none;
        padding: 0 8px 0 0;
    }
    li {
        font-family: JetBrains;
        transition: background, 0.2s;
        border-radius: 4px;
        padding: 2px 8px;
        font-size: 14px;
    }
    li:hover {
        background: var(--primary-lighten-1);
    }


    aside li {
        color: var(--font-grey)
    }
    aside li.active {
        background: var(--primary);
        color: #eee;
    }
    aside h1 {
        color: var(--primary)
    }
    a {
        text-decoration: none;
    }
    li.deprecated {
        text-decoration: solid line-through var(--font-grey);
    }
    li.active.deprecated {
        text-decoration: solid line-through #eee;
    }
</style>