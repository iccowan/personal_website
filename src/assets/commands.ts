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
import { myBio, myCerts, myProjects, myTechnologies } from './info';

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
              `<cmd>${commandName}</cmd><br />&nbsp;&nbsp;&nbsp;  - ${cmd.description}`
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

const whoIsMe = (_args: string[], terminalLines: TerminalLine[]) => {
  return aCommandResponse()
    .withTerminalLines([
      ...terminalLines,
      aTerminalLine().withHtmlSafe(true).withContent(myBio).build(),
    ])
    .build();
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

const projects = (_args: string[], terminalLines: TerminalLine[]) => {
  let newTermLines: TerminalLine[] = [];

  for (let i = 0; i < myProjects.length; i++) {
    const project = myProjects[i];

    newTermLines = [
      ...newTermLines,
      ...[
        aNewTerminalLine(),
        aTerminalLine()
          .withHtmlSafe(true)
          .withContent(
            `<b>${project.name}</b> - <a href="${project.url}" target="_none" class="a-shadow">Check it out!</a>`
          )
          .build(),
        aTerminalLine()
          .withHtmlSafe(true)
          .withContent('<i>' + project.description + '</i>')
          .build(),
        aTerminalLine()
          .withHtmlSafe(true)
          .withContent(
            `&nbsp;&nbsp;&nbsp;<a href="${project.githubRepo}" target="_none" class="a-shadow"><i>View Source on GitHub</i></a>`
          )
          .build(),
        aNewTerminalLine(),
      ],
    ];
  }

  return aCommandResponse()
    .withTerminalLines([...terminalLines, ...newTermLines])
    .build();
};

const certs = (_args: string[], terminalLines: TerminalLine[]) => {
  let newTermLines: TerminalLine[] = [];

  for (let i = 0; i < myCerts.length; i++) {
    const cert = myCerts[i];

    newTermLines = [
      ...newTermLines,
      ...[
        aNewTerminalLine(),
        aTerminalLine()
          .withHtmlSafe(true)
          .withContent(`<b>${cert.name}</b>`)
          .build(),
        aTerminalLine()
          .withHtmlSafe(true)
          .withContent(`<i>${cert.ratings.join(', ')}</i>`)
          .build(),
        aTerminalLine()
          .withHtmlSafe(true)
          .withContent(`&nbsp;&nbsp;&nbsp;<i>${cert.initialDate}</i>`)
          .build(),
        aNewTerminalLine(),
      ],
    ];
  }

  return aCommandResponse()
    .withTerminalLines([...terminalLines, ...newTermLines])
    .build();
};

const techs = (_args: string[], terminalLines: TerminalLine[]) => {
  return aCommandResponse()
    .withTerminalLines([
      ...terminalLines,
      ...myTechnologies.map((tech) =>
        aTerminalLine()
          .withHtmlSafe(true)
          .withContent(
            `<div class="tech-img-container"><img class="tech-img" src="${tech.logoUrl}" alt="${tech.name}" /><p>${tech.name}</p></div>`
          )
          .build()
      ),
    ])
    .build();
};

const sudo = (
  _args: string[],
  terminalLines: TerminalLine[]
): CommandResponse => {
  terminalLines = [
    ...terminalLines,
    aTerminalLine()
      .withContent(
        'We trust you have received the usual lecture from the local System Administrator. It usually boils down to these three things:'
      )
      .build(),
    aNewTerminalLine(),
    aTerminalLine()
      .withHtmlSafe(true)
      .withContent('&nbsp;&nbsp;&nbsp;#1) Respect the privacy of others.')
      .build(),
    aTerminalLine()
      .withHtmlSafe(true)
      .withContent('&nbsp;&nbsp;&nbsp;#2) Think before you type.')
      .build(),
    aTerminalLine()
      .withHtmlSafe(true)
      .withContent('&nbsp;&nbsp;&nbsp;#3) Respect the privacy of others.')
      .build(),
    aTerminalLine()
      .withHtmlSafe(true)
      .withContent(
        '&nbsp;&nbsp;&nbsp;#4) With great power comes great responsibility.'
      )
      .build(),
    aNewTerminalLine(),
    aTerminalLine()
      .withContent(
        'You are not in the sudoers file. This incident will be reported.'
      )
      .build(),
  ];

  return aCommandResponse().withTerminalLines(terminalLines).build();
};

const nvim = (
  _args: string[],
  terminalLines: TerminalLine[]
): CommandResponse => {
  terminalLines = [
    ...terminalLines,
    aTerminalLine()
      .withHtmlSafe(true)
      .withContent(
        'Unfortunately, we don\'t support Ian\'s favorite editor, NeoVim, at the moment, however you can check out its awesomeness <a href="https://neovim.io/" target="_none" class="a-shadow">HERE!</a>'
      )
      .build(),
  ];

  return aCommandResponse().withTerminalLines(terminalLines).build();
};

const echo = (
  args: string[],
  terminalLines: TerminalLine[]
): CommandResponse => {
  let newTermLines: TerminalLine[] = [];

  if (args.length === 1) {
    newTermLines = [
      aTerminalLine()
        .withContent('Call this command to print out some text!')
        .build(),
      aTerminalLine()
        .withHtmlSafe(true)
        .withContent('💡 <cmd>echo [text]</cmd>')
        .build(),
      aTerminalLine()
        .withHtmlSafe(true)
        .withContent(
          '💡 Example: <cmd>echo Some text to print to the terminal</cmd>'
        )
        .build(),
    ];
  } else {
    newTermLines = [
      aTerminalLine().withContent(args.slice(1).join(' ')).build(),
    ];
  }

  return aCommandResponse()
    .withTerminalLines([...terminalLines, ...newTermLines])
    .build();
};

export const commands: CommandList = {
  whois: {
    description: 'who is me? 🤖',
    callback: whoIsMe,
    show: true,
  },
  whoami: {
    description: 'who are you? 🧑',
    callback: whoAmI,
    show: true,
  },
  certs: {
    description: 'my pilot certificates ✈️',
    callback: certs,
    show: true,
  },
  projects: {
    description: 'some of my coding projects 🏗️',
    callback: projects,
    show: true,
  },
  techs: {
    description: "some of the technologies I'm familiar with 📠",
    callback: techs,
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
    callback: sudo,
    show: false,
  },
  nvim: {
    description: 'hidden',
    callback: nvim,
    show: false,
  },
  echo: {
    description: 'hidden',
    callback: echo,
    show: false,
  },
};
