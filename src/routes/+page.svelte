<script type="ts">
  import { setTitle } from '../stores/title';

  import Terminal from '../components/Terminal.svelte';
  import Toast from '../components/Toast.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    setTitle('CLI');
  })
</script>

<Toast show={true} dismissable={true} content="CLI not for you? Click here for a GUI (visual) version!" link="/gui" />
<Terminal />

