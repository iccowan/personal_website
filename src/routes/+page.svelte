<script type="ts">
	import { afterUpdate, onMount } from 'svelte';
	import type { TerminalLine } from '../models/TerminalLine';
	import { aTerminalLine } from '../models/TerminalLine';
	import Fa from 'svelte-fa';
	import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
	import { commands } from '../assets/commands';

	let termLines: TerminalLine[];
	let displayInputLine = false;
	let userName: string;
	let lineLeader: string;
	$: lineLeader = `[${userName}@ian.cowan.aero ~]$ `;

	let commandInput: HTMLInputElement;
	let currentCommandContent = '';
	let caretOffset = 0;

	onMount(() => {
		userName = localStorage.getItem('userName')
			? (localStorage.getItem('userName') as string)
			: 'guest';
		setDefaultTermLines();
		displayInputLine = true;
	});

	afterUpdate(() => {
		localStorage.setItem('userName', userName);
		window.scroll(0, document.body.scrollHeight);
	});

	function setDefaultTermLines() {
		termLines = [
			aTerminalLine()
				.withContent('👋 Hello, world! Welcome to my personal website')
				.withHtmlSafe(true)
				.build(),
			aTerminalLine()
				.withContent("💡 For a list of available commands, type <cmd>'help'</cmd>")
				.withHtmlSafe(true)
				.build()
		];

		if (userName != 'guest') {
			termLines = [
				...termLines,
				aTerminalLine()
					.withContent(`🪃 Welcome back, ${userName}! I'm glad this didn't scare you too much :)`)
					.build()
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

	function submitCurrentCommand() {
		displayInputLine = false;
		addTermLines([
			aTerminalLine()
				.withContent(lineLeader + currentCommandContent)
				.build()
		]);

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
				.withContent("Command not found. For a list of available commands, type <cmd>'help'</cmd>")
				.build()
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

				userName = response.data.userName === '' ? userName : response.data.userName;
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
			case 'Enter':
				submitCurrentCommand();
				break;
		}

		if (commandInput !== null) {
			commandInput.focus();
		}
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
						<Fa icon={faLinkedin} size="1.5x" class="inline icon-shadow" />
					</a>
					<a href="https://github.com/iccowan">
						<Fa icon={faGithub} size="1.5x" class="inline icon-shadow" />
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
				<input id="command-input" bind:this={commandInput} bind:value={currentCommandContent} />
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

	@keyframes pulsate {
		0% {
			filter: drop-shadow(0 0 100px hsl(var(--s)));
		}
		50% {
			filter: drop-shadow(0 0 0 hsl(var(--s)));
		}
		100% {
			filter: drop-shadow(0 0 100px hsl(var(--s)));
		}
	}

	:global(.icon-shadow path) {
		filter: drop-shadow(0 0 100px hsl(var(--s)));
		animation: pulsate 2s ease-out infinite;
	}

	:global(.icon-shadow:hover path) {
		filter: none;
		animation: none;
	}
</style>
