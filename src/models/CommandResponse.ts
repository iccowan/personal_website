import type { TerminalLine } from './TerminalLine';

export interface CommandResponse {
	terminalLines: TerminalLine[];
	data: CommandResponseData;
}

export class CommandResponseBuilder {
	private terminalLines: TerminalLine[] = [];
	private data: CommandResponseData = aCommandResponseData().build();

	public withTerminalLines(terminalLines: TerminalLine[]) {
		this.terminalLines = terminalLines;
		return this;
	}

	public withTerminalLine(terminalLines: TerminalLine) {
		this.terminalLines = [...this.terminalLines, terminalLines];
		return this;
	}

	public withData(data: CommandResponseData) {
		this.data = data;
		return this;
	}

	public build() {
		return {
			terminalLines: this.terminalLines,
			data: this.data
		};
	}
}

export function aCommandResponse() {
	return new CommandResponseBuilder();
}

export interface CommandResponseData {
	userName: string;
}

export class CommandResponseDataBuilder {
	private userName = '';

	public withUserName(userName: string) {
		this.userName = userName;
		return this;
	}

	public build() {
		return {
			userName: this.userName
		};
	}
}

export function aCommandResponseData() {
	return new CommandResponseDataBuilder();
}
