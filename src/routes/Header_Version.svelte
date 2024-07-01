<script lang="ts">
    import { Dropdown } from 'gros/dropdown'
</script>


<Dropdown position="bottom-start">
    <aside class="flex">
        v2
    </aside>
    {#snippet content()}
        <article class="flex z-depth-2">
            <a href="https://vincjo.fr/datatables.v1">v1</a>
            <a href="https://vincjo.fr/datatables.deprecated">v0</a>
        </article>
    {/snippet}
</Dropdown>

<style>
    aside {
        text-decoration: none;
        color: var(--font);
        border-radius: 4px;
        padding: 0;
        width: 56px;
        justify-content: center;
        height: 32px;
        padding: 0 8px;
        font-family: JetBrains;
        margin-left: 8px;
        font-size: 18px;
        background: var(--grey-lighten); 
    }
    article {
        flex-direction: column;
        background: var(--bg);
        border-radius: 4px;
        margin-top: 16px; 
        justify-content: center;
        align-items: center;
        border: 1px solid var(--grey);
    }
    a {
        height: 24px;
        margin: 2px;
        width: 56px;
        text-align: center;
        font-family: JetBrains;
        text-decoration: none;
        color: var(--primary);
        height: 32px;
        padding: 0 8px;
        font-size: 18px;
        border-radius: 2px;
    }
    a:hover {
        background: var(--primary-lighten-1);
    }
</style>