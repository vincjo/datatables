import type { State } from '$lib/remote'

export const reload = async ({ pageNumber, rowsPerPage, search }: State) => {

    const searchParam = search ? `&beer_name=${search}` : ''

    const response = await fetch(
        'https://api.punkapi.com/v2/beers'  +
            `?page=${pageNumber}`           +
            `&per_page=${rowsPerPage}`      +
            `${searchParam}`
    )
    return response.json()
}