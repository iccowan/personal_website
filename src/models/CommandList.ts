import type { CommandResponse } from './CommandResponse';

export interface CommandList {
	[key: string]: Command;
}

export interface Command {
	description: string;
	callback: (args: string[]) => CommandResponse;
	show: boolean;
}
