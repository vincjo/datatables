<script>
    export let stats
</script>

<section class="flex">
    {#each stats as stat}
        <aside class="flex">
            <span 
                class="value" 
                class:good={stat.value >= 100} 
                class:bad={stat.value <= 50}
            >
                {stat.value}
            </span>

            <span 
                class="name" 
                class:good={stat.value >= 100} 
                class:bad={stat.value <= 50}
            >
                {stat.name.replace('special-attack', 'attspe').replace('special-defense', 'defspe')}
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