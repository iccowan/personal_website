import { writable, type Writable } from 'svelte/store';

export const commandHistory: Writable<string[]> = writable([]);

export function addCommand(command: string) {
  commandHistory.update(() => [...getCommands(), command]);
}

export function getCommands(): string[] {
  let currentCommands: string[] = [];
  const unsub = commandHistory.subscribe((value) => (currentCommands = value));

  unsub();
  return currentCommands;
}
