import type { State } from '$lib/src/server'

export const reload = async ({ currentPage, rowsPerPage, search }: State) => {

    const qs = new URLSearchParams()
    qs.set('page', String(currentPage))
    qs.set('per_page', String(rowsPerPage))
    if (search) qs.set('beer_name', search)

    const response = await fetch(`https://api.punkapi.com/v2/beers?${qs}`)
    return response.json()
}