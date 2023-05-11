import { page } from '$app/stores';
import { base } from '$app/paths';
import { goto } from '$app/navigation';
import { derived, writable } from 'svelte/store';

export const url = derived(page, ($page) => {
  return $page.url.pathname;
});

export const hash = derived(page, ($page) => {
  return $page.url.hash;
});

export const anchor = writable(null);

export const getPath = (url: string) => {
  if (base) {
    return `${base}${url}`.replace('//', '/').replace(/\/$/, '');
  } else {
    return url;
  }
};

export const goTo = (url: string) => {
  if (base) {
    goto(`${base}${url}`.replace('//', '/').replace(/\/$/, ''));
  } else {
    goto(url);
  }
};
