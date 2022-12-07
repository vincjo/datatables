<script>
    import { fade } from 'svelte/transition'
    import Code from './Code.svelte'
    import { Highlight } from 'svelte-highlight'
    import { typescript } from 'svelte-highlight/languages'
    export let dataset
    export let components
    export let scrollY = true
    export let width = 'auto'
    let current = 'result' 
</script>

<div in:fade>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <ul>
        <li class:active={current === 'result'} on:click={() => current = 'result'}>Result</li>
        <li class:active={current === 'code'}   on:click={() => current = 'code'  }>Code</li>
        <li class:active={current === 'data'}   on:click={() => current = 'data'  }>Data</li>
    </ul>
    <section class="thin-scrollbar" class:code={current === 'code' || current === 'data'} class:table={current === 'result'} class:scroll-y={scrollY}>
        {#if current === 'result'}
            <div class="table z-depth-2" in:fade={{ duration:200 }} style="width:{width};background:#fff">
                <slot></slot>
            </div>
        {:else if current === 'code'}
            <div class="code">
                <Code {components}/>
            </div>
        {:else}
            <div class="code">
                <Highlight code={dataset} language={typescript}/>
            </div>
        {/if}
    </section>
</div>

<style>
    div{height:inherit;max-width:960px;}
    ul{list-style-type:none;padding:0;margin:0;display:flex;margin-bottom:8px;}
    li{display:block;font-size:16px;color:#676778;line-height:32px;padding:8px 0 0 0;margin:0 24px 0 16px;font-weight:bold;border-bottom:2px solid transparent;transition:color, 0.1s;cursor:pointer;}
    li.active{color:#b71540;border-bottom:2px solid #b71540;}
    section{height:inherit;position:relative;overflow:auto;height:480px;background:var(--hljs);border-radius:8px;}
    section.table{background:#eee;padding:0 10%;border-radius:8px;height:100%;}
    section.table.scroll-y{height:488px;}
    div.table{background:#fff;padding:0;border-radius:8px;margin:24px auto 24px auto;}
    section.table.scroll-y div.table{height:432px;}
    div.code{padding:0;}
</style>