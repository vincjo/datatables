<script lang="ts">
    import type { DataHandler } from '$lib/core'
    export let handler: DataHandler
    export let orderBy = null
    const identifier = orderBy ? orderBy.toString() : orderBy

    const sorted = handler.getSorted()
</script>


<th
    on:click={() => handler.sort(orderBy)}
    class:sortable={orderBy}
    class:active={$sorted.identifier === identifier}
>
    <div class="flex">
        <strong>
            <slot/>
        </strong>
        <span
            class:asc={$sorted.direction === 'asc'}
            class:desc={$sorted.direction === 'desc'}
        />
    </div>
</th>


<style>
    th {
        background:inherit;
        margin:0;
        white-space:nowrap;
        padding:0 4px;
        user-select: none;
        border-bottom:1px solid #e0e0e0;
    }
    th.sortable {
        cursor:pointer;
    }
    th.sortable div.flex{
        padding:8px 0 8px 16px;
        display:flex;
        justify-content:center;
        align-items:center;
        height:100%;
    }
    th.sortable span {
        padding-left:8px;
    }
    th.sortable span:before,
    th.sortable span:after {
        border:4px solid transparent;
        content:'';
        display:block;
        height:0;
        width:0;
    }
    th.sortable span:before {
        border-bottom-color:#e0e0e0;
        margin-top:2px;
    }
    th.sortable span:after {
        border-top-color:#e0e0e0;
        margin-top:2px;
    }
    th.active.sortable span.asc:before {
        border-bottom-color:#9e9e9e;
    }
    th.active.sortable span.desc:after {
        border-top-color:#9e9e9e;
    }
    th:not(.sortable) span{
        visibility:hidden;
    }
</style>