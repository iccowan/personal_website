<script type="ts">
  import Fa from 'svelte-fa';
  import { faTimes } from '@fortawesome/free-solid-svg-icons';
  import { onMount } from 'svelte';

  export let content: string;
  export let link: string | null = null;
  export let show = true;
  export let dismissable = true;

  onMount(() => {
    show = !window.matchMedia('(max-width: 1080px)').matches && show;
  });
</script>

{#if show && content}
  <div class="toast toast-end toast-top">
    <div class="alert alert-info">
      <a href={link}>
        <span>{content}</span>
      </a>
      {#if dismissable}
        <button on:click={() => (show = false)}>
          <Fa icon={faTimes} />
        </button>
      {/if}
    </div>
  </div>
{/if}
