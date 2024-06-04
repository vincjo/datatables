<script lang="ts">
    import { site } from '$site/utils'
    import Logo from '$site/Logo.svelte'

    let color = $derived.by(() => {
        if (site.mode === 'client') {
            return 'c2185b'
        }
        return '006990'
    })
</script>

<section>
    <Logo height="92px"/>
    <aside>
        <h1>svelte simple datatables</h1>
        <p>A toolkit for creating datatable components with Svelte</p>
        <div>
            <img src="https://img.shields.io/badge/v2-runes-v2?color=%23{color}" alt="any text"/>
        </div>
    </aside>
</section>

<style>
    section {
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
        margin-top: 32px;
        margin-bottom: 48px;
    }
    aside {
        margin-left: 20px;
    }
    h1 {
        font-size: 32px;
        line-height: 32px;
        text-align: left;
        font-weight: 400;
        margin: 0;
        color: var(--font);
    }
    img {
        height: 24px;
        max-width: 80px;
        margin: 0 16px 0 0;
    }
    p {
        color: var(--font-grey);
        margin: 0;
        padding: 0;
        line-height: 16px;
        font-size: 16px;
        margin: 8px 0;
    }
    div img {
        width: 96px;
    }

    @media (max-width: 800px) {
        section {
            justify-content: center;
        }
        section h1, p {
            text-align: center;
        }
        img {
            width: 120px;
        }
        div {
            text-align: center;
        }
    }
    /* h2{font-size:24px;color:#676778;font-weight:400;margin:24px 0 8px 0;} */
    /* 40b3ff     ff3e00    676778*/
</style>