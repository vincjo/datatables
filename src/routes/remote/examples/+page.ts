import { redirect } from '@sveltejs/kit'
import { getPath } from 'gros/page'

export const load = () => {
    throw redirect(307, getPath('/remote/examples/punk-api'))
}
