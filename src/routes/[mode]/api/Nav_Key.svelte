<script lang="ts">
    import type { TableHandler } from '$lib/client'
    import { site } from '$site/utils'
    import { page } from '$app/stores'
    import { slide } from 'svelte/transition'

    type Props = {
        data?: string[],
        key: string,
        value: string,
        table: TableHandler
    }
    let {
        data = [],
        key,
        value = $bindable(),
        table
    }: Props = $props()

    const search = table.createSearch(data)
    $effect(() => {
        value
        search.value = value
    })
    let active = $state(true)
</script>


<aside class={key}>
    <button class="alt-font flex" onclick={() => active = !active} class:active={active}>
        <span>{key} <b>({search.items.length})</b></span>
        <i class="micon">{active ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}</i>
    </button>
    {#if active}
        <ul transition:slide={{ duration: 200 }}>
            {#each search.items as item}
                <a href="{site.getPath(`/${site.mode}/api/${key}~${item}`)}">
                    <li class:active={item === $page.params.slug?.split('~')[1]}>
                        <span>{item}</span>
                    </li>
                </a>
            {/each}
        </ul>
    {/if}
</aside>

<style>
    aside {
        padding-right: 8px;
    }
    button {
        justify-content: space-between;
        font-size: 16px;
        font-weight: 400;
        margin: 8px 0 4px 0;
        text-transform: uppercase;
        font-weight: 400;
        color: var(--primary);
        text-align: left;
        padding: 4px 8px;
        border-radius: 4px;
        margin-right: 8px;
        width: 100%;
    }
    button i {
        font-size: 18px;
    }
    button span {
        width: 174px;
    }
    button span b {
        font-weight: normal;
        color: var(--primary-lighten);
        font-size: 12px;
        font-family: JetBrains;
    }
    button:hover {
        background: var(--grey-lighten);
    }
    button.active {
        background: var(--grey-lighten-2);
    }
    ul {
        list-style-type: none;
        padding: 0 8px 0 4px;
        margin: 0 0 0 8px;
        border-left: 1px solid var(--grey);
    }
    li {
        font-family: JetBrains;
        transition: background, 0.2s;
        border-radius: 4px;
        padding: 2px 8px;
        font-size: 13px;
        color: var(--font-grey);
        border-bottom: 1px solid var(--grey-lighten);
    }
    li:hover {
        background: var(--primary-lighten-1);
    }
    li.active {
        background: var(--primary);
        color: #eee;
    }
    a {
        text-decoration: none;
    }
    /* li.deprecated {
        text-decoration: solid line-through var(--font-grey);
    }
    li.active.deprecated {
        text-decoration: solid line-through #eee;
    } */
</style>