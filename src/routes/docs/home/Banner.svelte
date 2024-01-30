<script>
    import { mode } from '$site/utils'
    import Logo from '$site/Logo.svelte'
    let color = 'c2185b'
    $: $mode, update()
    
    const update = () => {
        color = ($mode === 'client') ? 'c2185b' : '006990'
    }
</script>

<section>
    <Logo height="92px"/>
    <aside>
        <h1>svelte simple datatables</h1>
        <p>A toolkit for creating datatable components with Svelte</p>
        <div>
            <img
                src="https://img.shields.io/npm/dt/@vincjo/datatables?color=%23{color}"
                alt="npm downloads"
            />
            <img
                src="https://img.shields.io/npm/v/@vincjo/datatables?color=%23{color}"
                alt="npm version"
            />
        </div>
    </aside>
</section>

<style>
    section {
        display: flex;
        justify-content: start;
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
        width: 88px;
        max-width: 400px;
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
    /* h2{font-size:24px;color:#676778;font-weight:400;margin:24px 0 8px 0;} */
    /* 40b3ff     ff3e00    676778*/
</style>