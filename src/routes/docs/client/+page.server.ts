import { redirect } from '@sveltejs/kit'
import { getPath } from 'gros/page'

export const load = () => {
    redirect(307, getPath('/docs/client/getting-started/intro'))
}