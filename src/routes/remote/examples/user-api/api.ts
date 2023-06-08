import type { DataHandler } from '$lib/remote'

export const reload = async (handler: DataHandler, skip: number, limit: number) => {
    const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
    const json = await response.json()
    handler.setTotalRows(json.total)
    return json.users 
}

export const search = async (handler: DataHandler) => {
    const { search, rowsPerPage } = handler.getState()
    if (!search) {
        return reload(handler, 0, rowsPerPage)
    }
    const response = await fetch(`https://dummyjson.com/users/search?q=${search}`)
    const json = await response.json()
    handler.setTotalRows(json.total)
    return json.users
}