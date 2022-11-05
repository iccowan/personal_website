<script type="ts">
  import { title } from "../stores/title";
  import { CLI_PAGE, GUI_PAGE, page } from '../stores/page';
</script>

<svelte:head>
  <title>{$title}</title>
  {#if $page === CLI_PAGE}
    <link rel="icon" href="/favicons/favicon-cli.svg" />
  {:else if $page === GUI_PAGE}
    <link rel="icon" href="/favicons/favicon-gui.svg" />
  {/if}
</svelte:head>

<slot />

<style lang="scss">
</style>
