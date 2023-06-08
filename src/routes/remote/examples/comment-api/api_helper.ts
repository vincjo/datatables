import type { DataHandler, State } from '$lib/remote'

export const get = async (handler: DataHandler, state: State) => {

    const { pageNumber, rowsPerPage } = state

    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${pageNumber}&_limit=${rowsPerPage}`)
    return response.json()
}

// export const search = async (handler: DataHandler) => {
//     const { search, rowsPerPage } = handler.getState()
//     if (!search) {
//         const result = await get(handler, 0, rowsPerPage)
//         handler.setRows(result)
//     }
//     const response = await fetch(`https://dummyjson.com/users/search?q=${search}`)
//     const json = await response.json()
//     handler.setTotalRows(json.total)
//     handler.setRows(json.users)
// }