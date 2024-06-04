import { API } from '$site/api'

export const load = (async (url) => {

    return { 
        page: await API.get(url) 
    }
})