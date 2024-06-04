<svelte:options runes={true}/>
<script lang="ts">

    type Props = {
        value       ?: string,
        label       ?: string,
        icon        ?: string,
    }
    let {
        value       = $bindable(),
        label       = '',
        icon        = null,
    }: Props = $props()

    const id = 'id' + (Math.random() + 1).toString(36).substring(7)
</script>


<section class="small">
    <label for="{id}">
        <div class="flex">
            {#if icon}
                <i class="micon">{icon}</i>
            {/if}
            <span>
                {label}
            </span>
        </div>
    </label>

    <input type="text" id="{id}" bind:value={value} spellcheck={false} class="bg-darken"/>
</section>


<style>
    section{
        margin:16px 0;
        position:relative;
    }
    label{
        display:flex;
        align-items:center;
        justify-content:space-between;
        color:var(--primary);
        font-weight:normal;
        font-size:16px;
        color:var(--primary);
        margin:0;
        margin-bottom:4px;
    }
    label .flex{
        display:flex;
        align-items:center;
        justify-content:flex-start;
        white-space:nowrap;
    }

    label i.micon{
        padding-right:8px;
        color:var(--primary);
        font-size:22px;
    }
    input{ 
        background: var(--bg);
        border: 1px solid var(--grey);
        color: var(--font) !important;
    }

    section.small{
        display:flex;
        justify-content:flex-start;
        align-items:center;
        margin:8px 0;
    }
    section.small label{
        font-size:12px;
        min-width:96px;
        white-space:normal;
        margin-right:8px;
    }
    section.small label .flex{
        white-space:normal;
    }
    section.small label .flex span{
        line-height:12px;
    }
    section.small i.micon{
        font-size:18px;
    }
    section.small input{
        font-size:14px;
        color:#424242;
        height:32px;
    }
</style>