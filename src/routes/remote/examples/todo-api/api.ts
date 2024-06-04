import type { State } from '$lib/remote'


export const reload = async (state: State) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?${getParams(state)}`
    )
    return response.json()
}

const getParams = (state: State) => {
    const { currentPage, rowsPerPage, sorting, filters, search } = state

    let params = `_page=${currentPage}`

    if (rowsPerPage) {
        params += `&_limit=${rowsPerPage}`
    }
    if (sorting) {
        params += `&_sort=${sorting.field}&_order=${sorting.direction}`
    }
    if (filters) {
        params += filters.map(({ field, value }) => `&${field}=${value}`).join()
    }
    if (search) {
        params += `&q=${search}`
    }
    return params
}
