<script>
    import { fade } from 'svelte/transition'
    import { Highlight, HighlightSvelte } from 'svelte-highlight'
    import { json } from 'svelte-highlight/languages'
    export let tableWidth = 'auto'
    export let data
    export let code
    export let scrollY = true
    export let background = '#fff'
    let current = 'result' 
</script>

<div in:fade>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <ul>
        <li class:active={current === 'result'} on:click={() => current = 'result'}>Result</li>
        <li class:active={current === 'code'}   on:click={() => current = 'code'  }>Code</li>
        <li class:active={current === 'data'}   on:click={() => current = 'data'  }>Data</li>
    </ul>
    <section class:code={current === 'code' || current === 'data'} class:table={current === 'result'} class:scroll-y={scrollY}>
        {#if current === 'result'}
            <div class="table z-depth-2" in:fade={{ duration:200 }} style="width:{tableWidth};background:{background}">
                <slot></slot>
            </div>
        {:else if current === 'code'}
            <div class="code">
                <HighlightSvelte {code}/>
            </div>
        {:else}
            <div class="code">
                <Highlight code={data} language={json}/>
            </div>
        {/if}
    </section>
</div>

<style>
    div{height:inherit;}
    ul{list-style-type:none;padding:0;margin:0;display:flex;margin-bottom:8px;}
    li{display:block;font-size:16px;color:#676778;line-height:32px;padding:8px 0 0 0;margin:0 24px 0 16px;font-weight:bold;border-bottom:2px solid transprent;transition:color, 0.1s;cursor:pointer;}
    li.active{color:#bdbdbd;border-bottom:2px solid #bdbdbd;}
    section{height:inherit;background:#fff;position:relative;overflow:auto;height:480px;background:var(--hljs);border-radius:8px;}
    section::-webkit-scrollbar {width:8px;height:8px;}
    section::-webkit-scrollbar-track {background:#eee;}
    section::-webkit-scrollbar-thumb {background:#9e9e9e;}
    section::-webkit-scrollbar-track-piece:start {top:40px;}
    section.table{background:#eee;padding:0 10%;border-radius:8px;height:100%;}
    section.table.scroll-y{height:488px;}
    div.table{background:#fff;padding:8px 0;border-radius:8px;margin:24px auto 24px auto;}
    section.table.scroll-y div.table{height:432px;}
    div.code{padding:0 16px;}
</style>