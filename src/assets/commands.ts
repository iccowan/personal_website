import {
  aCommandResponse,
  aCommandResponseData,
  type CommandResponse,
} from '../models/CommandResponse';
import type { CommandList } from '../models/CommandList';
import {
  aTerminalLine,
  aNewTerminalLine,
  type TerminalLine,
} from '../models/TerminalLine';
import { getUser, setUser } from '../stores/user';

const empty = (
  _args: string[],
  terminalLines: TerminalLine[]
): CommandResponse =>
  aCommandResponse().withTerminalLines(terminalLines).build();

const showHelp = (_args: string[], terminalLines: TerminalLine[]) => {
  return aCommandResponse()
    .withTerminalLines([
      ...terminalLines,
      aNewTerminalLine(),
      ...Object.keys(commands).map((commandName: string) => {
        const cmd = commands[commandName];

        if (cmd.show) {
          return aTerminalLine()
            .withHtmlSafe(true)
            .withContent(
              '<cmd>' +
                commandName +
                '</cmd>' +
                '<br>&nbsp;&nbsp;&nbsp;  - ' +
                cmd.description
            )
            .build();
        }

        return aTerminalLine().build();
      }),
      aNewTerminalLine(),
    ])
    .build();
};

const openGitHub = (
  _args: string[],
  terminalLines: TerminalLine[]
): CommandResponse => {
  window.open('https://github.com/iccowan', '_blank');
  return aCommandResponse()
    .withTerminalLines(terminalLines)
    .withTerminalLine(aTerminalLine().withContent('Opening GitHub...').build())
    .build();
};

const openLinkedIn = (
  _args: string[],
  terminalLines: TerminalLine[]
): CommandResponse => {
  window.open('https://www.linkedin.com/in/ian-cowan', '_blank');
  return aCommandResponse()
    .withTerminalLines(terminalLines)
    .withTerminalLine(
      aTerminalLine().withContent('Opening LinkedIn...').build()
    )
    .build();
};

const email = (
  _args: string[],
  terminalLines: TerminalLine[]
): CommandResponse => {
  window.open('mailto:ian@cowan.aero', '_blank');
  return aCommandResponse()
    .withTerminalLines(terminalLines)
    .withTerminalLine(
      aTerminalLine().withContent('Emailing ian@cowan.aero...').build()
    )
    .build();
};

const clear = (): CommandResponse => {
  return aCommandResponse().build();
};

const whoAmI = (
  args: string[],
  terminalLines: TerminalLine[]
): CommandResponse => {
  let userName = '';
  console.log(args);

  if (args.length === 1) {
    userName = getUser();
    if (userName && userName !== '' && userName !== 'guest') {
      terminalLines = [
        ...terminalLines,
        aTerminalLine()
          .withContent(
            `I already know you, ${userName}! If you would like to change your name, follow the instructions below`
          )
          .build(),
      ];
    }

    terminalLines = [
      ...terminalLines,
      aTerminalLine()
        .withContent('Call this command with your name to tell us who you are!')
        .build(),
      aTerminalLine()
        .withHtmlSafe(true)
        .withContent('💡 <cmd>whoami [name]</cmd>')
        .build(),
      aTerminalLine()
        .withHtmlSafe(true)
        .withContent('💡 Example: <cmd>whoami john</cmd>')
        .build(),
    ];
  } else {
    userName = args[1];
    terminalLines = [
      ...terminalLines,
      aTerminalLine()
        .withContent('Nice to meet you, ' + userName + '!')
        .build(),
    ];

    setUser(userName);
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
    show: true,
  },
  whoami: {
    description: 'who are you? 🧑',
    callback: whoAmI,
    show: true,
  },
  projects: {
    description: 'some of my coding projects 🏗️',
    callback: empty,
    show: true,
  },
  github: {
    description: 'check out my GitHub account 👨‍💻',
    callback: openGitHub,
    show: true,
  },
  linkedin: {
    description: 'check out my LinkedIn account 💼',
    callback: openLinkedIn,
    show: true,
  },
  email: {
    description: 'email me 📨',
    callback: email,
    show: true,
  },
  clear: {
    description: 'clear the terminal screen 🧽',
    callback: clear,
    show: true,
  },
  help: {
    description: 'show a list of available commands 🆘',
    callback: showHelp,
    show: true,
  },
  sudo: {
    description: 'hidden',
    callback: empty,
    show: false,
  },
  nvim: {
    description: 'hidden',
    callback: empty,
    show: false,
  },
};
