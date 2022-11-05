<script type="ts">
  import Fa from 'svelte-fa';
  import {faTimes} from '@fortawesome/free-solid-svg-icons';

  export let content: string;
  export let link: string | null = null;
  export let show = true;
  export let dismissable = true;
</script>

{#if show && content}
  <div class="toast toast-end toast-top">
    <div class="alert alert-info">
      <a href={link}>
        <span>{content}</span>
      </a>
      {#if dismissable}
        <button on:click={() => show = false}>
          <Fa icon={faTimes} />
        </button>
      {/if}
    </div>
  </div>
{/if}
