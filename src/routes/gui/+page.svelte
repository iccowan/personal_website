<script type="ts">
  import { setTitle } from "../../stores/title";

  import { onMount } from "svelte";
  import Toast from "../../components/Toast.svelte";
  import AboutMe from "../../components/AboutMe.svelte";

  onMount(() => {
    setTitle('GUI');
  })
</script>

<Toast content="Want to try the CLI again? Click here!" link="/" />
<AboutMe />
