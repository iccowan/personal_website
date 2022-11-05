import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

const localStorageKey = 'userName';
export const user: Writable<string> =
  browser && window.localStorage.getItem(localStorageKey)
    ? writable(window.localStorage.getItem(localStorageKey) as string)
    : writable('guest');

export function setUser(newUser: string) {
  user.update(() => newUser);
  localStorage.setItem(localStorageKey, newUser);
}

export function getUser() {
  let userName = '';
  const unsub = user.subscribe((value) => {
    userName = value;
  });

  unsub();

  return userName;
}
