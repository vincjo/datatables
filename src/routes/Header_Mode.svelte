<script>
    import Client from '~icons/material-symbols-light/laptop-windows-outline'
    import Remote from '~icons/material-symbols-light/dns-outline'
    import { Tooltip } from 'gros/tooltip'
    import { onMount } from 'svelte'
    import { mode } from '$site/utils'
    import { getPath } from 'gros/page'
    import { getMode, setMode } from '$site/utils'

    onMount(() => {
        setMode(getMode())
    })

</script>

<aside class="flex">
    <a on:click={() => setMode('client')} href="{getPath('/')}" class="btn tooltip" class:active={$mode === 'client'}>
        <Tooltip bottom content="client"/>
        <Client/>
    </a>
    <a on:click={() => setMode('remote')} href="{getPath('/')}" class="btn tooltip" class:active={$mode === 'remote'}>
        <Tooltip bottom content="remote"/>
        <Remote/>
    </a>
</aside>


<style>
    aside {
        border-radius: 4px;
        margin-right: 4px;
    }
    a {
        border-radius: 4px;
        padding: 0;
        width: 40px;
        height: 32px;
    }
    a:first-child {
        border-radius: 4px 0 0 4px;
        border-right: 1px solid var(--primary-lighten-3);
    }
    a:last-child {
        border-radius: 0 4px 4px 0;
    }
    a:hover {
        background: var(--grey-lighten);
    }
    a.active {
        background: var(--primary-lighten-2);
    }
</style>