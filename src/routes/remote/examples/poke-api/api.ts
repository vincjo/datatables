
export const reload = async (offset = 0, limit = 10) => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    )
    const json = await response.json()
    const pokemons = []

    for (const result of json.results) {
        const pokemon = await loadPokemon(result.url)
        const { height, id, order, sprites, stats, types, weight } = pokemon

        pokemons.push({
            id,
            name: result.name,
            height,
            order,
            stats: setStats(stats),
            sprite: sprites.other['official-artwork'].front_default,
            types,
            weight
        })
    }
    json.results = pokemons
    return json
}

const loadPokemon = async (url: string) => {
    const response = await fetch(url)
    return response.json()
}

const setStats = (stats) => {
    const result = stats.map(stat => {
        return { name : stat.stat.name, value: stat.base_stat }
    })
    return result
}