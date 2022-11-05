import { writable, type Writable } from "svelte/store";

export const CLI_PAGE = 'cli';
export const GUI_PAGE = 'gui';

export const page: Writable<string> = writable(CLI_PAGE);

export function setPage(pageName: string) {
  page.update(() => pageName === '' ? CLI_PAGE : pageName);
}
