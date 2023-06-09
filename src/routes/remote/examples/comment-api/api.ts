import type { State } from '$lib/remote'


export const reload = async (state: State) => {
    const qs = getParams(state)
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?${qs}`
    )
    return response.json()
}

const getParams = (state: State) => {
    const { pageNumber, rowsPerPage, sorted } = state

    let params = `_page=${pageNumber}`

    if (rowsPerPage) {
        params += `&_limit=${rowsPerPage}`
    }
    if (sorted) {
        params += `&_sort=${sorted.orderBy}&_order=${sorted.direction}`
    }

    return params
}
