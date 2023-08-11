<script>
    import { DataHandler } from '$lib/local'
    import { getPath } from 'gros/page'
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
            <a href="{getPath(`/api/${category}/${row.name}`)}">
                <li class:deprecated={row.isDeprecated} class:active={row.name === $page.params.slug}>
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
    }
    ul {
        list-style-type: none;
        padding: 0 8px 0 8px;
    }
    li {
        font-family: JetBrains;
        transition: background, 0.2s;
        border-radius: 4px;
        padding: 2px 8px;
    }
    li:hover {
        background: #eee;
    }


    aside.methods li {
        color: var(--secondary-darken)
    }
    aside.methods li.active {
        background: var(--secondary);
        color: #eee;
    }
    aside.methods h1 {
        color: var(--secondary)
    }
    aside.types li {
        color: var(--primary-darken)
    }
    aside.types li.active {
        background: var(--primary);
        color: #eee;
    }
    aside.types h1 {
        color: var(--primary)
    }
    a {
        text-decoration: none;
    }
    li.deprecated { 
       color: #9e9e9e !important;
    }
    li.deprecated {
        text-decoration: solid line-through #e57373;;
    }
    li.active.deprecated {
        background: #e0e0e0 !important;
    }
</style>