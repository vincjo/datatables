<script lang="ts">
    import { onMount } from 'svelte'

    let currentTheme = $state('dark')
    onMount(() => {
        currentTheme = getTheme()
        setTheme(currentTheme)
    })

    const setTheme = (theme: string) => {
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
        const userPrefersLightMode = window.matchMedia("(prefers-color-scheme: light)").matches
        if (userPrefersLightMode) return 'light'
        return 'dark'
    }
</script>

<button onclick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')} class="btn">
    {#if currentTheme === 'dark'}
        <svg width="28px" height="28px" viewBox="0 0 24 24"><path fill="var(--font)" d="M12 5.423q-.213 0-.357-.144t-.143-.356V2.539q0-.213.144-.357t.357-.144t.356.144t.143.356v2.385q0 .213-.144.356t-.357.144m4.643 1.935q-.14-.14-.13-.342q.01-.2.15-.366l1.65-1.694q.15-.166.359-.166t.377.17q.156.156.156.35t-.16.354L17.35 7.358q-.16.16-.354.16t-.354-.16m2.435 5.142q-.213 0-.356-.144t-.144-.357t.144-.356t.356-.143h2.385q.212 0 .356.144t.143.357t-.143.356t-.357.143zm-7.078 9.462q-.212 0-.356-.144t-.143-.357v-2.365q0-.212.144-.356t.357-.144t.356.144t.143.356v2.366q0 .212-.144.356t-.357.143M6.67 7.359l-1.713-1.67q-.166-.149-.166-.36t.166-.372q.16-.14.366-.14t.341.14L7.378 6.67q.14.134.14.341t-.136.348q-.15.14-.348.14t-.364-.14m11.662 11.686l-1.67-1.694q-.14-.165-.15-.366t.128-.342t.34-.14t.371.16l1.694 1.669q.146.14.143.344t-.149.37q-.16.164-.366.164t-.341-.165M2.539 12.5q-.213 0-.357-.144t-.143-.357t.143-.356t.357-.143h2.384q.213 0 .356.144t.144.357t-.144.356t-.356.143zm2.436 6.544q-.14-.16-.15-.363t.13-.344l1.676-1.675q.16-.16.35-.16t.358.155q.165.17.165.371t-.165.366l-1.65 1.65q-.166.166-.373.166t-.341-.166M12.005 17q-2.082 0-3.544-1.457T7 12.005T8.457 8.46T11.995 7t3.544 1.457T17 11.995t-1.457 3.544T12.005 17M12 16q1.65 0 2.825-1.175T16 12t-1.175-2.825T12 8T9.175 9.175T8 12t1.175 2.825T12 16m0-4"/></svg>
    {:else}
        <svg width="28px" height="28px" viewBox="0 0 24 24"><path fill="var(--font)" d="M12.058 20q-3.333 0-5.667-2.334T4.058 12q0-2.47 1.413-4.535q1.414-2.067 4.01-2.973q.306-.107.536-.056t.381.199t.192.38q.04.233-.063.489q-.194.477-.282.966t-.087 1.03q0 2.667 1.866 4.533t4.534 1.867q.698 0 1.277-.148q.58-.148.988-.24q.218-.04.399.01t.289.176q.118.125.16.308q.04.183-.048.417q-.715 2.45-2.803 4.013T12.058 20m0-1q2.2 0 3.95-1.213t2.55-3.162q-.5.125-1 .2t-1 .075q-3.075 0-5.238-2.162T9.158 7.5q0-.5.075-1t.2-1q-1.95.8-3.163 2.55T5.058 12q0 2.9 2.05 4.95t4.95 2.05m-.25-6.75"/></svg>
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