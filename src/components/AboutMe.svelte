<script type="ts">
  import Fa from 'svelte-fa';
  import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
  import { myBio, myTechnologies } from '../assets/info';
</script>

<div
  class="m-4 md:m-10 lg:m-20 grid grid-rows-2 xl:grid-rows-1 grid-flow-col gap-16"
>
  <article class="prose w-screen">
    <h1 id="intro">
      👨‍💻 Ian Cowan
      <span class="text-base">
        <a href="https://www.linkedin.com/in/ian-cowan">
          <Fa
            icon={faLinkedin}
            size="1.5x"
            class="inline icon-shadow"
            id="icon-1"
          />
        </a>
        <a href="https://github.com/iccowan">
          <Fa
            icon={faGithub}
            size="1.5x"
            class="inline icon-shadow"
            id="icon-2"
          />
        </a>
      </span>
    </h1>
    <h2>🫱‍🫲 Introductions</h2>
    <p>{@html myBio}</p>
    <h2 id="proj">🏗️ Projects</h2>
  </article>
  <article class="prose">
    <h1 class="hidden xl:block">&nbsp;</h1>
    <h2 id="tech">📠 Technologies</h2>
    {#each myTechnologies as tech}
      <div class="text-center w-40 h-40 float-left mr-10">
        <img
          class="h-20 inline-block mb-0"
          src={tech.logoUrl}
          alt={tech.name}
        />
        <p>{tech.name}</p>
      </div>
    {/each}
    <div class="clear-left" />
  </article>
</div>
