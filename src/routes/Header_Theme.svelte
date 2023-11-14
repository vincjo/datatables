<script>
    import Sun from '~icons/material-symbols-light/sunny-outline-rounded'
    import Moon from '~icons/material-symbols-light/dark-mode-outline-rounded'
    import { onMount } from 'svelte'

    let currentTheme
    onMount(() => {
        currentTheme = getTheme()
        setTheme(currentTheme)
    })

    const setTheme = (theme) => {
        document.documentElement.dataset.theme = theme
        document.cookie = `siteTheme=${theme}; max-age=31536000; path="/"`
        currentTheme = theme
    }

    const getTheme = () => {
        const regex = new RegExp(`(^| )siteTheme=([^;]+)`)
        const match = document.cookie.match(regex)
        if (match) {
            return match[2]
        }
        const userPrefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
        if (userPrefersDarkMode) return 'dark'
        return 'light'
    }
</script>

<button on:click={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')} class="btn">
    {#if currentTheme === 'dark'}
        <Moon/>
    {:else}
        <Sun/>
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