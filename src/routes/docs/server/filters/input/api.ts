import type { State } from '$lib/src/server'


export const reload = async (state: State) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?${getParams(state)}`)
    return response.json()
}

const getParams = ({ currentPage, rowsPerPage, sort, filters, search }: State) => {

    let params = `_page=${currentPage}`

    if (rowsPerPage) {
        params += `&_limit=${rowsPerPage}`
    }
    if (sort) {
        params += `&_sort=${String(sort.field)}&_order=${sort.direction}`
    }
    if (filters) {
        params += filters.map(({ field, value }) => `&${String(field)}=${value}`).join('')
    }
    if (search) {
        params += `&q=${search}`
    }
    return params
}
