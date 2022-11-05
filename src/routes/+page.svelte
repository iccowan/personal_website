<script type="ts">
  import { setTitle } from '../stores/title';

  import Terminal from '../components/Terminal.svelte';
  import Toast from '../components/Toast.svelte';
  import { onMount } from 'svelte';
  import { CLI_PAGE, setPage } from '../stores/page';

  onMount(() => {
    setTitle('CLI');
    setPage(CLI_PAGE);
  })
</script>

<Toast show={true} dismissable={true} content="CLI not for you? Click here for a GUI (visual) version!" link="/gui" />
<Terminal />

