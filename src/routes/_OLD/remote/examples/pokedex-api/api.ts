import type { State } from '$lib/remote'
type PokemonStat = {
    base_stat: number,
    stat: {
        name: string
    }
}

export const reload = async ({ offset, rowsPerPage, setTotalRows }: State) => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${rowsPerPage}`
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
    setTotalRows(json.count)
    return pokemons
}

const load_pokemon = async (url: string) => {
    const response = await fetch(url)
    return response.json()
}

const parse_stats = (stats : PokemonStat[]) => {
    return stats.map( stat => ({ name : stat.stat.name, value: stat.base_stat }) )
}