<script>
    import Table from './Table.svelte'
</script>

<section class="z-depth-4">
    <aside class="flex">
        <div>
            <h1>Welcome back!</h1>
            <p>Here's a list of your tasks for this month!</p>
        </div>
        <img src="/external/avatar-shadcn.png" alt="avatar"/>
    </aside>

    <Table/>
</section>

<style>
    section {
        border: 1px solid #e0e0e0;
        padding: 24px;
        border-radius: 8px;
        margin: 40px auto 96px auto;
        max-width: 1080px;
    }
    aside {
        justify-content: space-between;
        margin-bottom: 32px;
    }
    h1 {
        font-size: 28px;
        padding: 0;
        margin: 0;
    }
    p {
        color: var(--font-grey);
        margin: 4px 0;
    }
    img {
        width: 48px;
        height: 48px;
    }
</style>