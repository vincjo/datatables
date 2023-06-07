<script>
    import Prism from 'prismjs'
    import 'prism-svelte'
    import 'prismjs/components/prism-typescript'
    import CopyButton from './CopyButton.svelte'
    import Icon from './DemoCode_Icon.svelte'
    export let components
    let active = components[0].name
    let code = components[0].code
    let language = components[0].language ?? 'svelte'
    const setActive = (component) => {
        active = component.name
        code = component.code
        language = component.language ?? 'svelte'
    }
    const parse = (code) => {
        return code.replace('$lib', '@vincjo/datatables')
    }


</script>

<CopyButton {code} />

<section>
    <nav>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <ul>
            {#each components as component}
                <li class:active={component.name === active} on:click={() => setActive(component)}>
                    <Icon {component} active={component.name === active}/>
                    <span>{component.name}</span>
                </li>
                {#if component.components}
                    <ul>
                        {#each component.components as subComponent}
                            <li
                                class:active={subComponent.name === active}
                                on:click={() => setActive(subComponent)}
                            >
                                <Icon component={subComponent}/>
                                <span>{subComponent.name}</span>
                            </li>
                            {#if subComponent.components}
                                <ul>
                                    {#each subComponent.components as subsubComponent}
                                        <li
                                            class:active={subsubComponent.name === active}
                                            on:click={() => setActive(subsubComponent)}
                                        >
                                            <Icon component={subsubComponent}/>
                                            <span>{subsubComponent.name}</span>
                                        </li>
                                    {/each}
                                </ul>
                            {/if}
                        {/each}
                    </ul>
                {/if}
            {/each}
        </ul>
    </nav>

    <aside class="thin-scrollbar-darken">
        {#if language === 'typescript'}
        <pre class="language-svelte">
{@html Prism.highlight(parse(code), Prism.languages.typescript)}
        </pre>
        {:else}
        <pre class="language-svelte">
{@html Prism.highlight(parse(code), Prism.languages.svelte, 'svelte')}
        </pre>
        {/if}

    </aside>
</section>

<style>
    section {
        position: relative;
        height: 100%;
        width: 100%;
    }
    nav {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 200px;
        background: #212121;
        border: none;
        box-shadow: none;
        padding: 32px 0px;
    }
    ul {
        color: #9e9e9e;
        margin: 0;
        padding: 0;
        list-style-type: none;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size: 12px;
    }
    ul ul {
        padding-left: 16px;
    }
    li {
        cursor: pointer;
        padding: 4px 8px;
        transition: all, 0.2s;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    li:hover {
        background: #000;
    }
    li.active {
        color: #e0e0e0;
        background: #000;
    }

    aside {
        position: absolute;
        left: 200px;
        top: 0;
        bottom: 0;
        right: 0;
        overflow: auto;
        background: var(--hljs);
    }
    pre {
        margin: 0;
    }

    li.active :global(i.svelte) {
        color: #ff3e00 !important;
    }

    li.active :global(i.typescript) {
        color: #3178c6;
    }

    @media (max-width: 800px) {
        nav {
            display: none;
        }
        aside {
            left: 0;
        }
    }
</style>
