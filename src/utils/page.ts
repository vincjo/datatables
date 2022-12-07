import { page } from '$app/stores'
import { base } from '$app/paths'
import { goto } from '$app/navigation'
import { derived } from 'svelte/store';

export const url = derived(
	page, $page => {
        return $page.url.pathname
    }
)

export const getPath = (url: string) => {
    if(base === '/svelte-simple-datatable') {
        return `${base}${url}`.replace('//', '/').replace(/\/$/, '')
    }
    else {
        return url
    }
}

export const goTo = (url: string) => {
    if(base === '/svelte-simple-datatable') {
        goto( `${base}${url}`.replace('//', '/').replace(/\/$/, '') )
    }
    else {
        goto(url)
    }
}
