<script lang="ts">
    import { Tooltip } from 'gros/tooltip'
    import { site } from '$site/utils'
</script>

<aside class="flex">
    <a
        onclick={() => site.setMode('client')}
        href="{site.getPath('/')}"
        class="btn tooltip"
        class:active={site.mode === 'client'}
    >
        <Tooltip bottom content="client"/>
        <svg width="28px" height="28px" viewBox="0 0 24 24"><path fill="var(--font)" d="M1 18.77v-1h3.616V17q-.691 0-1.153-.462T3 15.385v-8.77q0-.69.463-1.152T4.615 5h14.77q.69 0 1.152.463T21 6.615v8.77q0 .69-.463 1.153T19.385 17v.77H23v1zM4.616 16h14.769q.269 0 .442-.173t.173-.442v-8.77q0-.269-.173-.442T19.385 6H4.615q-.269 0-.442.173T4 6.615v8.77q0 .269.173.442t.443.173M4 16V6z"/></svg>
    </a>
    <a
        onclick={() => site.setMode('remote')}
        href="{site.getPath('/')}"
        class="btn tooltip"
        class:active={site.mode === 'remote'}
    >
        <Tooltip bottom content="remote"/>
        <svg width="28px" height="28px" viewBox="0 0 24 24"><path fill="var(--font)" d="M7.502 7.116q-.415 0-.709.29t-.293.707t.291.709t.707.294t.709-.292t.293-.706t-.291-.71t-.707-.293m0 8.77q-.415 0-.709.29q-.293.292-.293.707q0 .416.291.71t.707.293t.709-.292t.293-.706t-.291-.709t-.707-.294M4.77 4.616h14.462q.327 0 .548.22t.22.544v5.35q0 .387-.221.636q-.221.25-.548.25H4.769q-.327 0-.548-.25Q4 11.117 4 10.731V5.38q0-.325.221-.545t.548-.22m.231 1v5h14v-5zm-.23 7.77h14.422q.368 0 .588.243t.22.603v5.23q0 .426-.22.675t-.588.249H4.808q-.367 0-.588-.25q-.22-.248-.22-.673V14.23q0-.36.201-.603q.201-.244.568-.244m.231 1v5h14v-5zm0-8.768v5zm0 8.769v5z"/></svg>
    </a>
</aside>


<style>
    aside {
        border-radius: 4px;
        margin-right: 4px;
    }
    a {
        border-radius: 4px;
        padding: 0;
        width: 40px;
        height: 32px;
    }
    a:first-child {
        border-radius: 4px 0 0 4px;
        border-right: 1px solid var(--primary-lighten-3);
    }
    a:last-child {
        border-radius: 0 4px 4px 0;
    }
    a:hover {
        background: var(--grey-lighten);
    }
    a.active {
        background: var(--primary-lighten-2);
    }
</style>