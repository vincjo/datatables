<script lang="ts">
    let current = $state('npm')
    const managers = {
        npm: 'npm install -D @vincjo/datatables',
        yarn: 'yarn add -D @vincjo/datatables',
        pnpm: 'pnpm install -D @vincjo/datatables'
    }
</script>

<article>
    <nav class="flex">
        <button onclick={() => current = 'npm'}  class:active={current === 'npm'} >npm </button>
        <button onclick={() => current = 'pnpm'} class:active={current === 'pnpm'}>pnpm</button>
        <button onclick={() => current = 'yarn'} class:active={current === 'yarn'}>yarn</button>
    </nav>
    <aside>
        {managers[current]}
    </aside>
</article>



<style>
    article {
        padding: 8px;
        margin: 16px 0;
        border: 1px solid var(--grey);
        border-radius: 8px;
        max-width: 440px;
    }
    nav {
        border-bottom: 1px solid var(--grey);
        padding-bottom: 8px;
    }
    button {
        padding: 4px 8px;
        font-size: 16px;
        margin-left: 4px;
        border-radius: 4px;
        color: var(--font);
    }

    button.active {
        background: var(--primary);
        color: #eee;
    }
    aside {
        padding: 24px 16px;
        font-family: JetBrains;
        border-radius: 0 0 4px 4px;
        color: var(--font-grey);
        font-weight: bold;
        font-size: 16px;
        background: var(--grey-lighten-2);
    }
</style>