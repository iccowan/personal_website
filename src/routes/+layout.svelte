<script type="ts">
  import { title } from "../stores/title";
</script>

<svelte:head>
  <title>{$title}</title>
</svelte:head>

<slot />

<style lang="scss">
</style>
