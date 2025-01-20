import { redirect } from '@sveltejs/kit'
import { path } from 'gros/page'

export const load = () => {
    redirect(307, path.get('/docs/client/getting-started/intro'))
}