<script lang="ts">
    import { site, Logo } from '$site'
</script>

<section>
    <Logo height="80px"/>
    <aside>
        <h1>svelte simple datatables</h1>
        <p>For <b>{site.mode}-side</b> pagination</p>
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
        font-size: 36px;
        font-family: Archivo;
        line-height: 34px;
        text-align: left;
        font-weight: 400;
        margin: 0;
        color: var(--font);
        letter-spacing: 0;
    }
    p {
        color: var(--primary);
        font-family: Archivo;
        margin: 0;
        padding: 0;
        line-height: 16px;
        font-size: 26px;
        line-height: 28px;
        margin: 8px 0;
        font-family: Archivo;
    }

    @media (max-width: 800px) {
        section {
            justify-content: center;
        }
        section h1, p {
            text-align: center;
        }
    }
    /* h2{font-size:24px;color:#676778;font-weight:400;margin:24px 0 8px 0;} */
    /* 40b3ff     ff3e00    676778*/
</style>