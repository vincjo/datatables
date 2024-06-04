<svelte:options runes={true}/>
<script lang="ts">
    import { fadeScale }    from 'gros/transition'
    import { modal }        from 'gros/modal'
    import { fade }         from 'svelte/transition'
    import { cubicInOut }   from 'svelte/easing'
    import { draggable }    from '@neodrag/svelte'
    import { clickOutside } from 'gros/action'

    const close = () => modal.close()
</script>



{#if modal.isActive}
    <section transition:fade|global={{ duration: 150 }}>
        <article 
            use:draggable={{ handle: '.modal.handle' }} 
            use:clickOutside={close}
            transition:fadeScale|global={{ duration: 150, easing: cubicInOut, baseScale: 0.5 }}
        >
           <svelte:component this={modal.component} props={modal.props} {close}/>
        </article>

    </section>
{/if}


<style>
    section{
        display:flex;
        align-items:center;
        justify-content:center;
        position:fixed;
        top:0;
        left:0;
        bottom:0;
        right:0;
        background:rgba(0,0,0,0.4);z-index:9999;
    }

    article{
        max-height:80vh;
        background:var(--bg);
        margin:calc(auto - 4vh) auto;
        position: relative;
        border-radius:4px;
        -webkit-box-shadow: 0 24px 38px 3px rgba(0,0,0, 0.14), 0 9px 46px 8px rgba(0,0,0, 0.12), 0 11px 15px -7px rgba(0,0,0, 0.2);
        box-shadow: 0 24px 38px 3px rgba(0,0,0, 0.14), 0 9px 46px 8px rgba(0,0,0, 0.12), 0 11px 15px -7px rgba(0,0,0, 0.2);
    }
</style>