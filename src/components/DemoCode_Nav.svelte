<script>
    import 'prismjs/components/prism-typescript'
    import Icon from './DemoCode_Icon.svelte'
    import { fade } from 'svelte/transition'
    export let components
    export let code
    export let language
    let show = false
    let active = components[0].name
    const setActive = (component) => {
        active = component.name
        code = component.code
        language = component.language ? 'typescript' : 'svelte'
    }
</script>

<button class="btn" class:show={show} on:click={() => show = !show}>
    {#if show}
        <svg width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"></path></svg>
    {:else}
        <svg width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M3 18v-2h18v2H3Zm0-5v-2h18v2H3Zm0-5V6h18v2H3Z"></path></svg>
    {/if}
</button>

<nav class:show={show}>

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

{#if show}
    <div on:click={() => show = false} on:keypress in:fade={{ duration: 200 }}/>
{/if}

<style>
    button {
        position: absolute;
        top: 4px;
        left: 4px;
        width: 32px;
        height: 32px;
        background: rgba(0,0,0,0.4);
        color: rgba(255,255,255,0.7);
        z-index: 3;
        border-radius:50%;
        padding: 0;
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
        transition: left, 0.2s;
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

    li.active :global(i.svelte) {
        color: #ff3e00 !important;
    }

    li.active :global(i.typescript) {
        color: #3178c6;
    }

    div {
        position: absolute;
        top: 0;
        left: 200px;
        bottom: 0;
        right: 0;
        z-index: 2;
        background: rgba(0,0,0,0.4);
    }

    @media (max-width: 800px) {
        nav:not(.show) {
            left: -200px;
        }
        nav.show{
            width: 200px;
            z-index: 2;
            background: rgba(0,0,0,0.8);
        }
    }
    @media (min-width: 800px) {
        button {
            display: none;
        }
    }

</style>