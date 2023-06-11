


export const load = async () => {
    const response = await fetch(
        'https://api.punkapi.com/v2/beers?page=1&per_page=10'
    )
    return {
        data: response.json(),
    }
}











