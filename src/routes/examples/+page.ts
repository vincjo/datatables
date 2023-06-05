import { redirect } from '@sveltejs/kit';
import { getPath } from '$utils/page';

export const load = () => {
    throw redirect(307, getPath('/examples/basic'));
};
