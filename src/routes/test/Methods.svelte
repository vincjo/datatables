<script>
    let { ast } = $props()

    const methods = ast.map(method => {
        const [ signature ] = method.signatures
        const parameters = signature?.parameters?.map(parameter => {
            return {
                name: parameter.name,
                type: parameter.type.text.replace(/"/g, "'")
            }
        })
        return { 
            name: method.name,
            returnType: signature.return.type.text, 
            args: parameters ?? [],
            ast: method
        }
    })
</script>


<section class="thin-scrollbar">
    {#each methods as { name, returnType, args }}
    <article class="flex">
        <b>{name}</b>
        <i>{returnType}</i>
        {#each args as { name, type}}
            <u class="flex">{name} <em>: {type}</em></u>
        {/each}
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
        align-items: baseline;
    }
    i {
        font-style: normal;
        width: 160px;
        font-size: 12px;

    }
    em {
        font-style: normal;
        font-size: 12px;
        color: var(--primary);
        margin-right: 8px;
    }
</style>