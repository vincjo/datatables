<script>
    let { stats } = $props()
</script>

<section class="flex">
    {#each stats as stat}
        {@const [name, value] = stat}
        <aside class="flex">
            <span 
                class="value" 
                class:good={value >= 100} 
                class:bad={value <= 65}
            >
                {value}
            </span>

            <span 
                class="name" 
                class:good={value >= 100} 
                class:bad={value <= 65}
            >
                {name}
            </span>
        </aside>
    {/each}
</section>

<style>
    section {
        font-size: 11px;
        flex-wrap: wrap;
        max-width: 160px !important;
    }
    aside {
        width: 80px;
    }
    span {
        height: 14px;
        padding: 0; 
    }
    span.name {
        color: #616161;
        margin-left: 4px;
    }
    span.value {
        font-family: JetBrains;
        color: #616161;
    }
    span.good {
        color:#81c784;
        font-weight:bold;
        font-size: 13px;
    }
    span.bad {
        color:#e57373;
        font-size: 11px;
    }
</style>