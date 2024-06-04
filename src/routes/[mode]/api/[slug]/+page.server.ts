import { API } from '$site/api'
import { dev } from '$app/environment'

export const load = async (url) => {
    if (dev === false) {
        console.log('lol')
        return { page: undefined }
    }
    const test = await API.get(url)
    return { 
        page: await API.get(url) 
    }
}