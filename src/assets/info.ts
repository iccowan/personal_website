export const myBio = '';

export interface Project {
  name: string,
  description: string,
  githubRepo: string,
  url: string | undefined
}

export const myProjects: Project[] = [];

export interface Technology {
  name: string,
  url: string,
  logoUrl: string | undefined
}

export const myTechnologies: Technology[] = [];
