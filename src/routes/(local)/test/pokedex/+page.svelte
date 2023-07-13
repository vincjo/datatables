<script lang=ts>
    type PokemonStat = {
        base_stat: number,
        stat: {
            name: string
        }
    }

    const reload = async () => {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/?offset=100&limit=151`
        )
        const json = await response.json()
        const pokemons = []

        for (const result of json.results) {
            const pokemon = await load_pokemon(result.url)
            const { id, stats, sprites, types, height, weight } = pokemon

            pokemons.push({
                id,
                name: result.name,
                stats: parse_stats(stats),
                sprite: sprites.other['official-artwork'].front_default,
                types,
                height,
                weight,
            })
        }
        return pokemons
    }

    const load_pokemon = async (url: string) => {
        const response = await fetch(url)
        return response.json()
    }

    const parse_stats = (stats : PokemonStat[]) => {
        return stats.map( stat => ({ name : stat.stat.name, value: stat.base_stat }) )
    }
</script>


{#await reload()}
    <h1>LoL</h1>
{:then pokemons}
<pre>
{JSON.stringify(pokemons, null, 4)}
</pre>
{/await}