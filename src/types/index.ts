export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  techStack: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
}
