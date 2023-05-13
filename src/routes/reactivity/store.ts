import { writable } from 'svelte/store';

type User = { id?: number; first_name: string; last_name: string; email: string };

export const users = writable([]);

export const create = (user: User) => {
    user.id = Math.floor(Math.random() * 9999);
    users.update((store) => {
        return [user, ...store];
    });
};

export const destroy = (user: User) => {
    users.update((store) => {
        return store.filter((item) => item.id !== user.id);
    });
};

export const update = (user: User) => {
    users.update((store) => {
        const result = store.find((item) => item.id === user.id);
        result.first_name = user.first_name;
        result.last_name = user.last_name;
        result.email = user.email;
        return store;
    });
};
