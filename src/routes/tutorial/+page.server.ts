import { redirect } from '@sveltejs/kit';
import { getPath } from '$utils/page';

export const load = ({ locals }) => {
  throw redirect(307, getPath('/tutorial/html-table'));
};
