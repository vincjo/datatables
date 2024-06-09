<script>
    let { folders, level = 0 } = $props()
    const factor = 24
    const size = 18
</script>

{#if folders}
    {#each folders as folder}

        <section>
            <article style:margin-left="{level * factor}px" class="flex">
                <svg width="{size + 4}px" height="{size + 4}px" viewBox="0 0 24 24"><path fill="var(--primary-lighten)" d="M4.5 19q-.633 0-1.066-.434Q3 18.133 3 17.5V6.616q0-.633.491-1.125Q3.983 5 4.615 5h4.31q.323 0 .628.13q.305.132.522.349L11.596 7h8.731q.214 0 .357.143t.143.357t-.143.357t-.357.143H7.447q-1.397 0-2.422.898T4 11.162v6.223q0 .211.106.346t.279.23l1.917-6.42q.162-.516.593-.836t.967-.32h12.823q.813 0 1.305.649q.49.649.254 1.426l-1.646 5.48q-.142.477-.545.769q-.403.291-.9.291z"/></svg>
                {folder.name}
            </article>
            {#if folder.files}
                {#each folder.files as file}
                    <aside style:margin-left="{(level + 1) * factor}px" class="flex">
                        <svg width="{size}px" height="{size}px" viewBox="0 0 24 24"><path fill="var(--secondary-lighten)" d="M2.5 5V3.116q0-.667.475-1.142t1.14-.474H6q.213 0 .356.144t.144.357t-.144.356T6 2.5H4.116q-.27 0-.443.173t-.173.443V5q0 .213-.144.356t-.357.144t-.356-.144T2.5 5m18 0V3.116q0-.27-.173-.443t-.442-.173H18q-.213 0-.356-.144t-.144-.357t.144-.356T18 1.5h1.885q.666 0 1.14.475t.475 1.14V5q0 .213-.144.356t-.357.144t-.356-.144T20.5 5m-18 15.885V19q0-.213.144-.356t.357-.144t.356.144T3.5 19v1.885q0 .269.173.442t.443.173H6q.213 0 .356.144t.144.357t-.144.356T6 22.5H4.116q-.667 0-1.141-.475t-.475-1.14M19.885 22.5H18q-.213 0-.356-.144t-.144-.357t.144-.356T18 21.5h1.885q.269 0 .442-.173t.173-.442V19q0-.213.144-.356t.357-.144t.356.144t.143.356v1.885q0 .666-.475 1.14t-1.14.475m-12.77-3q-.69 0-1.152-.462T5.5 17.884V6.116q0-.691.463-1.153T7.116 4.5h9.769q.69 0 1.153.463t.462 1.153v11.769q0 .69-.462 1.153t-1.154.462zM10 9.5h4q.213 0 .356-.144t.144-.357t-.144-.356T14 8.5h-4q-.213 0-.356.144t-.144.357t.144.356T10 9.5m0 3h4q.213 0 .356-.144t.144-.357t-.144-.356T14 11.5h-4q-.213 0-.356.144t-.144.357t.144.356t.356.143m0 3h4q.213 0 .356-.144t.144-.357t-.144-.356T14 14.5h-4q-.213 0-.356.144t-.144.357t.144.356t.356.143"/></svg>
                        {file.name}
                    </aside>
                {/each}
            {/if}
    </section>

        {#if folder.folders}
            <svelte:self folders={folder.folders} level={level + 1}/>
        {/if}


    {/each}
{/if}



<style>
    article, aside {
        color: var(--font);
        padding-left: 4px;
    }
    svg {
        margin-right: 4px;
    }
    aside {
        font-size: 11px;
        font-family: JetBrains;
    }
    article {
        margin-top: 2px;
    }
</style>