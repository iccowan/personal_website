<script type="ts">
	import { onMount } from 'svelte';
	import type { Terminal } from 'xterm';

	let term: Terminal;
	const writeDelay = 0;
	let currLine: string = '';
	let acceptInput: boolean = false;

	const timer = (msToWait) => new Promise((res) => setTimeout(res, msToWait));

	onMount(() => {
		import('xterm').then((xterm) => {
			term = new xterm.Terminal({
				cursorStyle: 'block',
				cursorBlink: true,
				disableStdin: false,
				fontSize: 18,
				cols: calculateTerminalWidth()
			});
			term.open(document.getElementById('terminal')!);

			initTerm();
		});
	});

	function calculateTerminalWidth() {
		return Math.floor(
			document.getElementById('term-container')!.getBoundingClientRect()['width'] / 12
		);
	}

	async function initTerm() {
		await writeToTerm('Hello, World! 👋');
		await writeToTerm("My name is FooBart and it's my job to introduce you to Ian Cowan!");
		writeNewlineToTerm();
		await writeToTerm('I hope you like the command line!');
		await writeToTerm(
			"This is one of Ian's favorite tools and it appears this is all that is working here at the moment..."
		);
		await writeToTerm("No worries if you don't know how to use it... I'm here to help!");
		writeNewlineToTerm();
		await writeToTerm(
			"If at any time you're lost and want to see a list of commands you can use, simply type `help`."
		);
		await writeToTerm("Let's get started! - try typing the command `help` to see what you can do!");

		term.onKey(({ key, domEvent }) => {
			if (acceptInput) {
				switch (domEvent.key) {
					case 'Enter':
						writeNewlineToTerm();
						handleInput(currLine);
						currLine = '';
						break;
					case 'Backspace':
						currLine = currLine.slice(0, currLine.length - 1);
						term.write('\b \b');
						break;
					default:
						currLine += key;
						term.write(key);
						break;
				}

				console.log(currLine);
			}
		});

		acceptTermInput();
	}

	async function writeToTerm(toWrite: string) {
		for (const ltr of toWrite) {
			term.write(ltr);
			await timer(writeDelay);
		}

		writeNewlineToTerm();
	}

	function writeNewlineToTerm() {
		term.writeln('');

		if (acceptInput) {
			putPrompt();
		}
	}

	function getCurrentTime() {
		const dateNow = new Date()
			.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
			.split(':');
		return dateNow[0] + ':' + dateNow[1];
	}

	function getPrompt() {
		return '[' + getCurrentTime() + '] guest@ian.cowan.aero $ ';
	}

	function putPrompt() {
		term.write(getPrompt());
	}

	function handleInput(input: string) {}

	function acceptTermInput() {
		acceptInput = true;
		term.focus();
	}

	function denyTermInput() {
		acceptInput = false;
		term.blur();
	}
</script>

<div class="mockup-window bg-base-300 m-10">
	<div class="p-10 bg-black h-full" id="term-container">
		<div id="terminal" />
	</div>
</div>

<style lang="scss">
</style>
