import { writable, type Writable } from 'svelte/store';

const titleLeader = 'Ian Cowan';
export const title: Writable<string> = writable(titleLeader);

export function setTitle(newTitle: string) {
  title.update(() => {
    if (newTitle === '') {
      return titleLeader;
    }

    return titleLeader + ' | ' + newTitle;
  });
}
