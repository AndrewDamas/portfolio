export interface Project {
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  screenshotUrl?: string;
}

const projects: Project[] = [];

export default projects;
