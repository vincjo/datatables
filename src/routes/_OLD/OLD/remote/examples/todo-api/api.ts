import type { State } from '$lib/remote'


export const reload = async (state: State) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?${getParams(state)}`
    )
    return response.json()
}

const getParams = (state: State) => {
    const { currentPage, rowsPerPage, sort, filters, search } = state

    let params = `_page=${currentPage}`

    if (rowsPerPage) {
        params += `&_limit=${rowsPerPage}`
    }
    if (sort) {
        params += `&_sort=${sort.orderBy}&_order=${sort.direction}`
    }
    if (filters) {
        params += filters.map(({ filterBy, value }) => `&${filterBy}=${value}`).join()
    }
    if (search) {
        params += `&q=${search}`
    }
    return params
}
