import {
	aCommandResponse,
	aCommandResponseData,
	type CommandResponse
} from '../models/CommandResponse';
import type { CommandList } from '../models/CommandList';
import { aTerminalLine, aNewTerminalLine } from '../models/TerminalLine';

const empty = (): CommandResponse => aCommandResponse().build();

const showHelp = () => {
	return aCommandResponse()
		.withTerminalLines([
			aNewTerminalLine(),
			...Object.keys(commands).map((commandName: string) => {
				const cmd = commands[commandName];

				if (cmd.show) {
					return aTerminalLine()
						.withHtmlSafe(true)
						.withContent(
							'<cmd>' + commandName + '</cmd>' + '<br>&nbsp;&nbsp;&nbsp;  - ' + cmd.description
						)
						.build();
				}

				return aTerminalLine().build();
			}),
			aNewTerminalLine()
		])
		.build();
};

const openGitHub = (): CommandResponse => {
	window.open('https://github.com/iccowan', '_blank');
	return aCommandResponse()
		.withTerminalLine(aTerminalLine().withContent('Opening GitHub...').build())
		.build();
};

const openLinkedIn = (): CommandResponse => {
	window.open('https://www.linkedin.com/in/ian-cowan', '_blank');
	return aCommandResponse()
		.withTerminalLine(aTerminalLine().withContent('Opening LinkedIn...').build())
		.build();
};

const whoAmI = (args: string[]): CommandResponse => {
	let terminalLines = [aTerminalLine().build()];
	let userName = '';

	if (args.length === 1) {
		terminalLines = [
			aTerminalLine()
				.withContent('Call this command with your name to tell us who you are!')
				.build(),
			aTerminalLine().withHtmlSafe(true).withContent('💡 <cmd>whoami [name]</cmd>').build(),
			aTerminalLine().withHtmlSafe(true).withContent('💡 Example: <cmd>whoami john</cmd>').build()
		];
	} else {
		userName = args[1];
		terminalLines = [
			aTerminalLine()
				.withContent('Nice to meet you, ' + userName + '!')
				.build()
		];
	}

	return aCommandResponse()
		.withTerminalLines(terminalLines)
		.withData(aCommandResponseData().withUserName(userName).build())
		.build();
};

export const commands: CommandList = {
	whois: {
		description: 'who is me? 🤖',
		callback: empty,
		show: true
	},
	whoami: {
		description: 'who are you? 🧑',
		callback: whoAmI,
		show: true
	},
	projects: {
		description: 'some of my coding projects 🏗️',
		callback: empty,
		show: true
	},
	github: {
		description: 'check out my GitHub account 👨‍💻',
		callback: openGitHub,
		show: true
	},
	linkedin: {
		description: 'check out my LinkedIn account 💼',
		callback: openLinkedIn,
		show: true
	},
	email: {
		description: 'email me 📨',
		callback: empty,
		show: true
	},
	clear: {
		description: 'clear the terminal screen 🧽',
		callback: empty,
		show: true
	},
	help: {
		description: 'show a list of available commands 🆘',
		callback: showHelp,
		show: true
	},
	sudo: {
		description: 'hidden',
		callback: empty,
		show: false
	}
};
