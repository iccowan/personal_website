<script type="ts">
  import { setTitle } from '../stores/title';

  import Terminal from '../components/Terminal.svelte';
  import Toast from '../components/Toast.svelte';
  import { onMount } from 'svelte';
  import { CLI_PAGE, setPage } from '../stores/page';

  let finishedLoading = false;

  onMount(() => {
    if (window.matchMedia('(max-width: 1024px)').matches) {
      window.location.assign('/gui');
      return;
    }

    setTitle('CLI');
    setPage(CLI_PAGE);

    finishedLoading = true;
  });
</script>

{#if finishedLoading}
  <Toast
    show={true}
    dismissable={true}
    content="CLI not for you? Click here for a GUI (visual) version!"
    link="/gui"
  />
  <Terminal />
{/if}
