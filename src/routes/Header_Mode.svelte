<script>
    import Client from '~icons/material-symbols-light/laptop-windows-outline'
    import Remote from '~icons/material-symbols-light/dns-outline'
    import { Tooltip } from 'gros/tooltip'
    import { onMount } from 'svelte'
    import { mode } from '$site/utils'

    let currentMode
    onMount(() => {
        currentMode = getMode()
        setMode(currentMode)
    })

    const setMode = (value) => {
        document.documentElement.dataset.mode = value
        document.cookie = `siteMode=${value}; max-age=31536000; path="/"`
        $mode = value
        currentMode = value
    }

    const getMode = () => {
        const regex = new RegExp(`(^| )siteMode=([^;]+)`)
        const match = document.cookie.match(regex)
        if (match) {
            return match[2]
        }
        return 'client'
    }
</script>

<button on:click={() => setMode(currentMode === 'remote' ? 'client' : 'remote')} class="btn tooltip">
    <Tooltip bottom content="{currentMode}"/>
    {#if currentMode === 'remote'}
        <Remote/>
    {:else}
        <Client/>
    {/if}
</button>

<style>
    button {
        border-radius: 4px;
        padding: 0;
        width: 40px;
        height: 32px;
    }
    button:hover {
        background: var(--grey);
    }
</style>