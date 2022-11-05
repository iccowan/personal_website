<script type="ts">
  import { setTitle } from '../../stores/title';

  import { onMount } from 'svelte';
  import Toast from '../../components/Toast.svelte';
  import AboutMe from '../../components/AboutMe.svelte';
  import { GUI_PAGE, setPage } from '../../stores/page';

  onMount(() => {
    setTitle('GUI');
    setPage(GUI_PAGE);
  });
</script>

<div class="hidden lg:inline">
  <Toast content="Want to try the CLI again? Click here!" link="/" />
</div>
<AboutMe />
