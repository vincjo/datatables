<script>
    let { ast } = $props()

    const properties = ast.map(property => {
        return { 
            name: property.name,
            type: property.type.text,
            text: property.default ? property.default.split('>(')[0] + '>' : '',
            ast: property
        }
    })
</script>


<section class="thin-scrollbar">
    {#each properties as { name, type, text }}
    <article class="flex">
        <b>{name}</b>
        <i>{type}</i>
        <u>{text}</u>
    </article>
    {/each}
</section>


<style>
    section {
        position: relative;
        height: 80vh;
        overflow: auto;
        margin: 24px auto;
        width: 960px;
        border: 1px solid var(--grey);
        border-radius: 8px;
    }
    article {
        color: var(--font);
        padding: 8px 16px;
        border-bottom: 1px solid var(--grey-lighten);
        font-family: JetBrains;
    }
    b {
        color: var(--secondary);
        width: 160px;
    }
    u {
        text-decoration: none;
        color: var(--ternary);
    }
    i {
        font-style: normal;
        width: 160px;
        font-size: 12px;

    }
</style>