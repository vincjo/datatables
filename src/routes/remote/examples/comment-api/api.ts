import type { State } from '$lib/remote'


export const reload = async (state: State) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?${getParams(state)}`
    )
    return response.json()
}

const getParams = ({ pageNumber, rowsPerPage, sort }: State) => {

    let params = `_page=${pageNumber}`

    if (rowsPerPage) {
        params += `&_limit=${rowsPerPage}`
    }
    if (sort) {
        params += `&_sort=${sort.orderBy}&_order=${sort.direction}`
    }

    return params
}
