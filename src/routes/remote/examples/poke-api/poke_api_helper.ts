
export const get = async (offset = 0, limit = 10) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
    const json = await response.json()
    const data = []

    for (let result of json.results) {
        const pokemon = await getPokemon(result.url)
        const { height, id, order, sprites, stats, types, weight } = pokemon
        const stat = stats.map(item => {
            return { name : item.stat.name, value: item.base_stat }
        })
        data.push({ id, name: result.name, height, order, stat, sprite: sprites.other['official-artwork'].front_default, types, weight }) 
    }
    json.results = data
    return json
}

const getPokemon = async (url: string) => {
    const response = await fetch(url)
    return response.json()
}