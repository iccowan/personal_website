<script type="ts">
	import { afterUpdate, onMount } from 'svelte';
	import type { TerminalLine } from '../models/TerminalLine';
	import { aTerminalLine } from '../models/TerminalLine';
	import Fa from 'svelte-fa';
	import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

	let termLines: TerminalLine[];
	let displayInputLine = false;
	let userName = 'guest';
	let lineLeader: string;

	let commandInput: HTMLInputElement;
	let currentCommandContent = '';
	let caretOffset = 0;
	let currentCharUnderCaret: string;
	$: {
		const currentCharIdx = currentCommandContent.length + caretOffset;
		currentCharUnderCaret =
			caretOffset === 0 ? ' ' : currentCommandContent.substring(currentCharIdx, currentCharIdx + 1);
	}

	onMount(() => {
		setDefaultTermLines();
		updateLineLeader('guest');
		displayInputLine = true;
	});

	afterUpdate(() => {
		window.scroll(0, document.body.scrollHeight);
	});

	function updateLineLeader(name: string) {
		userName = name;
		lineLeader = `[${userName}@ian.cowan.aero ~]$ `;
	}

	function setDefaultTermLines() {
		termLines = [];
	}

	function moveCaretLeft() {
		caretOffset = Math.max(-1 * currentCommandContent.length, caretOffset - 1);
	}

	function moveCaretRight() {
		caretOffset = Math.min(0, caretOffset + 1);
	}

	function submitCurrentCommand() {
		displayInputLine = false;
		termLines = [
			...termLines,
			aTerminalLine()
				.withContent(lineLeader + currentCommandContent)
				.build()
		];
		handleCalledCommand(currentCommandContent).then(() => {
			displayInputLine = true;
		});
		currentCommandContent = '';
		caretOffset = 0;
	}

	function handleCalledCommand(currentCommandContent: string): Promise<void> {
		return new Promise((resolve) => {
			resolve();
		});
	}

	function focusCommandInput(event: KeyboardEvent) {
		if (commandInput) {
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

			commandInput.focus();
		}
	}
</script>

<svelte:window on:keydown={focusCommandInput} />

<div class="fixed top-2 right-2">
	<a href="https://www.linkedin.com/in/ian-cowan/" class="drop-shadow-lg shadow-white">
		<Fa icon={faLinkedin} size="1.5x" class="inline hover:shadow-none" />
	</a>
	<a href="https://github.com/iccowan">
		<Fa icon={faGithub} size="1.5x" class="inline drop-shadow-lg shadow-white hover:shadow-none" />
	</a>
</div>

{#if termLines}
	<div id="terminal-container" class="m-4">
		<div class="terminal-header">
			<span class="text-accent-focus">
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
				>
					{currentCharUnderCaret}
				</span>
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	input#command-input {
		position: fixed;
		opacity: 0;
	}

	span#caret {
		left: calc(var(--caret-offset) * 0.6rem);
	}
</style>
