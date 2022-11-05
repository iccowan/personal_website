<script type="ts">
  import { afterUpdate, onMount } from 'svelte';
  import type { TerminalLine } from '../models/TerminalLine';
  import { aTerminalLine } from '../models/TerminalLine';
  import Fa from 'svelte-fa';
  import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
  import { commands } from '../assets/commands';
  import { user } from '../stores/user';
  import { addCommand, commandHistory } from '../stores/commands';

  let termLines: TerminalLine[];
  let displayInputLine = false;
  let lineLeader: string;
  let commandHistoryLocation = 0;
  let prevCtrl = false;

  $: lineLeader = `[${$user}@ian.cowan.aero ~]$ `;

  let commandInput: HTMLInputElement;
  let currentCommandContent = '';
  let caretOffset = 0;

  onMount(() => {
    setDefaultTermLines();
    displayInputLine = true;
  });

  afterUpdate(() => {
    window.scroll(0, document.body.scrollHeight);
  });

  function setDefaultTermLines() {
    termLines = [
      aTerminalLine()
        .withContent('👋 Hello, world! Welcome to my personal website')
        .withHtmlSafe(true)
        .build(),
      aTerminalLine()
        .withContent(
          "💡 For a list of available commands, type <cmd>'help'</cmd>"
        )
        .withHtmlSafe(true)
        .build(),
    ];

    if ($user != 'guest') {
      termLines = [
        ...termLines,
        aTerminalLine()
          .withContent(
            `🪃 Welcome back, ${$user}! I'm glad this didn't scare you too much :)`
          )
          .build(),
      ];
    }
  }

  function moveCaretLeft() {
    caretOffset = Math.max(-1 * currentCommandContent.length, caretOffset - 1);
  }

  function moveCaretRight() {
    caretOffset = Math.min(0, caretOffset + 1);
  }

  function addTermLines(lines: TerminalLine[]) {
    termLines = [...termLines, ...lines];
  }

  function showLastCommand() {
    if (commandHistoryLocation > 0) {
      currentCommandContent = $commandHistory[--commandHistoryLocation];
      caretOffset = 0;
    }
  }

  function showNextCommand() {
    if (commandHistoryLocation < $commandHistory.length - 1) {
      currentCommandContent = $commandHistory[++commandHistoryLocation];
      caretOffset = 0;
    } else {
      clearCommand();
    }
  }

  function removeCommand(prevCtrl: boolean) {
    if (!prevCtrl) {
      return;
    }

    addTermLines([
      aTerminalLine().withContent(lineLeader +  currentCommandContent).build()
    ]);
    
    clearCommand()
  }

  function clearInput(prevCtrl: boolean) {
    if (!prevCtrl) {
      return;
    }

    clearCommand();
    termLines = [];
  }

  function clearCommand() {
    commandHistoryLocation = $commandHistory.length;
    currentCommandContent = '';
  }

  function submitCurrentCommand() {
    displayInputLine = false;
    commandHistoryLocation = $commandHistory.length;

    addTermLines([
      aTerminalLine()
        .withContent(lineLeader + currentCommandContent)
        .build(),
    ]);

    commandHistoryLocation++;
    addCommand(currentCommandContent);

    handleCalledCommand(currentCommandContent).then(() => {
      displayInputLine = true;
    });
    currentCommandContent = '';
    caretOffset = 0;
  }

  function missingCommand(command: string) {
    addTermLines([
      aTerminalLine().withContent(`❓ foobart: ${command}`).build(),
      aTerminalLine()
        .withHtmlSafe(true)
        .withContent(
          "Command not found. For a list of available commands, type <cmd>'help'</cmd>"
        )
        .build(),
    ]);
  }

  function handleCalledCommand(currentCommandContent: string): Promise<void> {
    const args = currentCommandContent.split(' ');
    const currentCommand = args[0];

    return new Promise((resolve) => {
      if (!(currentCommand in commands)) {
        missingCommand(currentCommand);
      } else {
        const response = commands[currentCommand].callback(args, termLines);
        termLines = response.terminalLines;
      }

      resolve();
    });
  }

  function focusCommandInput(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowLeft':
        moveCaretLeft();
        break;
      case 'ArrowRight':
        moveCaretRight();
        break;
      case 'ArrowUp':
        showLastCommand();
        break;
      case 'ArrowDown':
        showNextCommand();
        break;
      case 'ControlLeft':
      case 'ControlRight':
        prevCtrl = true;
        break;
      case 'KeyC':
        removeCommand(prevCtrl);
        break;
      case 'KeyL':
        clearInput(prevCtrl);
        break;
      case 'Enter':
        submitCurrentCommand();
        break;
    }

    if (event.code !== 'ControlLeft' && event.code !== 'ControlRight') {
      prevCtrl = false;
    }

    if (commandInput !== null) {
      commandInput.focus();
    }
  }

  function preventSelect(element: Event) {
    const target = element.target as HTMLInputElement;
    target.selectionStart = target.selectionEnd;
  }
</script>

<svelte:window on:keydown={focusCommandInput} />

{#if termLines}
  <div id="terminal-container" class="m-4">
    <div class="terminal-header">
      <span class="text-accent-focus">
        <p>foobart 🤖 Interactive Terminal Version 1.0.0</p>
        <p>Kernel 🌽 Version 6.1-rc2</p>
        <div>
          <a href="https://www.linkedin.com/in/ian-cowan">
            <Fa icon={faLinkedin} size="1.5x" class="inline icon-shadow" id="icon-1" />
          </a>
          <a href="https://github.com/iccowan">
            <Fa icon={faGithub} size="1.5x" class="inline icon-shadow" id="icon-2" />
          </a>
        </div>
        <pre class="mb-0">
            __/\__ 
           `==/\==`              _____               _____ 
 ____________/__\____________   |_   _|             / ____|
/____________________________\    | |  __ _ _ __   | |     _____      ____ _ _ __
  __||__||__/.--.\__||__||__      | | / _` | '_ \  | |    / _ \ \ /\ / / _` | '_ \
 /__|___|___( {'><'} )___|___|__\    _| || (_| | | | | | |___| (_) \ V  V / (_| | | | |
           _/`--`\_             |_____\__,_|_| |_|  \_____\___/ \_/\_/ \__,_|_| |_|
          (/------\)
        </pre>
      </span>
    </div>
    {#each termLines as termLine}
      <div class="terminal-line">
        <span class="term-line-content text-accent-focus">
          {#if termLine.htmlSafe}
            {@html termLine.content}
          {:else}
            {termLine.content}
          {/if}
        </span>
      </div>
    {/each}
    {#if displayInputLine}
      <div class="input-line flex">
        <span class="flex-none whitespace-pre-wrap">{lineLeader}</span>
        <input
          id="command-input"
          bind:this={commandInput}
          bind:value={currentCommandContent}
          on:select={preventSelect}
        />
        <span class="whitespace-pre-wrap">{currentCommandContent}</span>
        <span
          id="caret"
          style="--caret-offset: {caretOffset}"
          class="bg-accent-focus w-2.5 opacity-80 relative whitespace-pre-wrap text-accent-content"
        />
      </div>
    {/if}
  </div>
{/if}

<style lang="scss">
  input#command-input {
    position: fixed;
    opacity: 0;
  }

  @keyframes caret-flash {
    0% {
      transform: scaleY(1);
    }

    50% {
      transform: scaleY(0);
    }

    100% {
      transform: scaleY(1);
    }
  }

  span#caret {
    left: calc(var(--caret-offset) * 0.6rem);
    opacity: 0.7;
    z-index: -1;
    animation: caret-flash 1s ease-out infinite;
  }

  :global(cmd) {
    text-shadow: 0 0 5px hsl(var(--s));
  }
</style>
