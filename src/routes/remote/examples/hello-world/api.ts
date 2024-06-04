import type { State } from '$lib/remote'


export const reload = async (state: State) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?${getParams(state)}`
    )
    return response.json()
}

const getParams = ({ currentPage, rowsPerPage, sorting }: State) => {

    let params = `_page=${currentPage}`

    if (rowsPerPage) {
        params += `&_limit=${rowsPerPage}`
    }
    if (sorting) {
        params += `&_sort=${sorting.field}&_order=${sorting.direction}`
    }

    return params
}
