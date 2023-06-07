


export const load = async () => {
    const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10'
    )
    return {
        data: response.json(),
    }
}











