<script type="ts">
  import Fa from 'svelte-fa';
  import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
  import { myBio, myCerts, myProjects, myTechnologies } from '../assets/info';
</script>

<div
  class="m-4 md:m-10 lg:m-20 grid grid-rows-2 xl:grid-rows-1 grid-flow-col gap-16"
>
  <article class="prose w-screen">
    <h1 id="intro">
      👨‍💻 Ian Cowan
      <span class="text-base">
        <a href="https://www.linkedin.com/in/ian-cowan" target="_none">
          <Fa
            icon={faLinkedin}
            size="1.5x"
            class="inline icon-shadow"
            id="icon-1"
          />
        </a>
        <a href="https://github.com/iccowan" target="_none">
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
    {#each myProjects as project}
      <h3>
        {project.name}
        <a href={project.githubRepo} target="_none"
          ><Fa icon={faGithub} class="icon-shadow inline" id="icon-1" /></a
        >
      </h3>
      <a href={project.url} class="mt-0 a-shadow no-underline" target="_none"
        >Check it out!</a
      >
      <p>{project.description}</p>
    {/each}
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
    <h2 id="certs">✈️ Pilot Certificates</h2>
    {#each myCerts as cert}
      <div>
        <h3 class="inline">{cert.name}</h3>
        <p class="inline"><i>{cert.initialDate}</i></p>
      </div>
      <p class="mt-0"><i>{cert.ratings.join(', ')}</i></p>
    {/each}
  </article>
</div>
