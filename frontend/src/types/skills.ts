export type SkillLevel = 'Expert' | 'Advanced' | 'Intermediate' | 'Familiar';

export type SkillCategoryType = 
  | 'Frontend' 
  | 'Backend' 
  | 'Database' 
  | 'DevOps' 
  | 'Cloud' 
  | 'AI' 
  | 'UI/UX' 
  | 'Tools' 
  | 'Languages';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategoryType;
  level: SkillLevel;
  yearsOfExperience: number;
  projectCount: number;
  description: string;
  icon?: string; // Optional SVG or reference for future use
}
