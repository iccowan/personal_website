export const myBio =
  "Hello, world! 👋 My name, if you couldn't tell from the header, is Ian Cowan. I am a software engineer and part time flight instructor and love learning new things in both the computer science and aviation world. One of my favorite areas in programming is server administration and if you couldn't guess, yes, I use the command line for everything (even my editor - yes I use NeoVim). I began flying in 2017 and have since obtained my commercial ASEL certificate along with my CFI-I certificates. Flying and programming are two of my passions, and I love to work with projects that combine these two together.<br/><br />Please have fun exploring my bare bones CLI website and finding some of the easter eggs I have hidden. You can also find this project on GitHub, but finding the easter eggs that way is just cheating!";

export interface Cert {
  name: string;
  ratings: string[];
  initialDate: string;
}

export const myCerts: Cert[] = [
  {
    name: '🧑‍✈️  Airline Transport Pilot',
    ratings: ['AMEL', 'ERJ-170/190', 'Commercial ASEL'],
    initialDate: 'Feburary 12, 2024',
  },
  {
    name: '👨‍🏫 Flight Instructor',
    ratings: ['ASE', 'Instrument Airplane'],
    initialDate: 'July 16, 2020',
  },
  {
    name: '📚 Ground Instructor',
    ratings: ['Advanced', 'Instrument'],
    initialDate: 'August 13, 2018',
  },
];

export interface Project {
  name: string;
  description: string;
  githubRepo: string;
  url: string | undefined;
}

export const myProjects: Project[] = [
  {
    name: '🖥️ Personal Website (This!)',
    description:
      'This is the website that you are currently on. This was my attempt to create a typescript CLI emulator to present some information about myself, but also make it accessible for those that may not be familiar with a CLI. Written in Svelte',
    githubRepo: 'https://github.com/iccowan/personal_website/',
    url: 'https://ian.cowan.aero',
  },
  {
    name: '🛩️ AviationAPI',
    description:
      'Compiles aviation chart data from the FAA and allows for free access to aviation enthusiasts. Include an API and GUI. Written in Laravel',
    githubRepo: 'https://github.com/iccowan/AviationAPI_WWW',
    url: 'https://www.aviationapi.com/',
  },
  {
    name: '🛬 VATSIM Virtual ZTL ARTCC Website',
    description:
      'Rewrote the entire website for a VATSIM Virtual ARTCC (virtual air traffic control network). Currently still assisting in maintaining the website. Written in Laravel',
    githubRepo: 'https://github.com/ZTL-ARTCC/Current_Website',
    url: 'https://www.ztlartcc.org',
  },
];

export interface Technology {
  name: string;
  logoUrl: string | undefined;
}

export const myTechnologies: Technology[] = [
  {
    name: 'Java',
    logoUrl: 'https://cdn.svgporn.com/logos/java.svg',
  },
  {
    name: 'Python',
    logoUrl: 'https://cdn.svgporn.com/logos/python.svg',
  },
  {
    name: 'Spring',
    logoUrl: 'https://cdn.svgporn.com/logos/spring-icon.svg',
  },
  {
    name: 'Linux',
    logoUrl: 'https://cdn.svgporn.com/logos/linux-tux.svg',
  },
  {
    name: 'Git',
    logoUrl: 'https://cdn.svgporn.com/logos/git-icon.svg',
  },
  {
    name: 'GitHub & GitHub Actions',
    logoUrl: 'https://cdn.svgporn.com/logos/github-actions.svg',
  },
  {
    name: 'Angular',
    logoUrl: 'https://cdn.svgporn.com/logos/angular-icon.svg',
  },
  {
    name: 'Svelte',
    logoUrl: 'https://cdn.svgporn.com/logos/svelte-icon.svg',
  },
  {
    name: 'Laravel',
    logoUrl: 'https://cdn.svgporn.com/logos/laravel.svg',
  },
];
