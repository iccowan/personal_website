<script type="ts">
  import Fa from 'svelte-fa';
  import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
</script>

<div class="m-20">
  <article class="prose w-screen">
    <h1>
      👨‍💻 Ian Cowan
      <span class="text-base">
        <a href="https://www.linkedin.com/in/ian-cowan">
          <Fa icon={faLinkedin} size="1.5x" class="inline icon-shadow" id="icon-1" />
        </a>
        <a href="https://github.com/iccowan">
          <Fa icon={faGithub} size="1.5x" class="inline icon-shadow" id="icon-2" />
        </a>
      </span>
    </h1>
    <p>This is a brief intro about myself!</p>
    <h2>🏗️ Projects</h2>
  </article>
</div>
