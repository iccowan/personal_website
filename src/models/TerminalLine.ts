export interface TerminalLine {
	htmlSafe: boolean;
	content: string;
}

export class TerminalLineBuilder {
	private htmlSafe = false;
	private content = '';

	public withHtmlSafe(htmlSafe: boolean): TerminalLineBuilder {
		this.htmlSafe = htmlSafe;
		return this;
	}

	public withContent(content: string): TerminalLineBuilder {
		this.content = content;
		return this;
	}

	build(): TerminalLine {
		return {
			htmlSafe: this.htmlSafe,
			content: this.content
		};
	}
}

export function aTerminalLine() {
	return new TerminalLineBuilder();
}
