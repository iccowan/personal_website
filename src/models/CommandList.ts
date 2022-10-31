import type { CommandResponse } from './CommandResponse';
import type { TerminalLine } from './TerminalLine';

export interface CommandList {
  [key: string]: Command;
}

export interface Command {
  description: string;
  callback: (args: string[], terminalLines: TerminalLine[]) => CommandResponse;
  show: boolean;
}
