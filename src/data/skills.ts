export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

const skills: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "HTML5", icon: "html" },
      { name: "CSS3", icon: "css" },
      { name: "Redux", icon: "redux" },
      { name: "RTK Query", icon: "rtkquery" },
      { name: "Vite", icon: "vite" },
      { name: "Material UI", icon: "mui" },
      { name: "React Hook Form", icon: "reacthookform" },
      { name: "Yup", icon: "yup" },
      { name: "React PDF", icon: "reactpdf" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "REST APIs", icon: "api" },
      { name: "Supabase", icon: "supabase" },
    ],
  },
  {
    category: "Tools & Cloud",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Figma", icon: "figma" },
      { name: "Jest", icon: "jest" },
      { name: "Azure", icon: "azure" },
    ],
  },
];

export default skills;
