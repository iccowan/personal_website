import { writable } from "svelte/store";

const titleLeader = 'Ian Cowan';
export const title = writable(titleLeader);

export function setTitle(newTitle: string) {
  title.update(() => {
    if (newTitle === '') {
      return titleLeader;
    }

    return titleLeader + ' | ' + newTitle;
  });
}
