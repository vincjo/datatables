
import { dev } from '$app/environment'


export const load = async ({ params }) => {
    if (!dev) {
        return {
            nav: {}
        }
    }
    const mode = params.mode
    const nav = await fetch(`http://localhost:3333/document/nav?mode=${mode}`)
    return {
        nav: await nav.json()
    }
}