import type { State } from '$lib/src/server'

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

export const reload = async ({ offset, rowsPerPage, setTotalRows }: State) => {
    await sleep(2000)
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${rowsPerPage}`
    )
    const json = await response.json()
    const pokemons = []

    for (const result of json.results) {
        const pokemon = await load_pokemon(result.url)
        const { id, sprites, height, weight } = pokemon

        pokemons.push({
            id,
            name: result.name,
            sprite: sprites.other['official-artwork'].front_default,
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

export const initial = [
    {
        "id": 1,
        "name": "bulbasaur",
        "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        "height": 7,
        "weight": 69
    },
    {
        "id": 2,
        "name": "ivysaur",
        "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
        "height": 10,
        "weight": 130
    },
    {
        "id": 3,
        "name": "venusaur",
        "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
        "height": 20,
        "weight": 1000
    },
    {
        "id": 4,
        "name": "charmander",
        "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        "height": 6,
        "weight": 85
    },
    {
        "id": 5,
        "name": "charmeleon",
        "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
        "height": 11,
        "weight": 190
    }
]