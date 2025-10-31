// Portfolio Type Definitions

export type PortfolioCategory = {
  id: string;
  name: string;
  slug: string;
  color: string;
  description: string;
  icon?: string;
};

export type ProjectSubCategory = {
  id: string;
  name: string;
  slug: string;
};

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  client: string;
  myRole: string;
  category: string;
  subCategory?: string;
  shortDescription: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  image: string;
  video?: string;
  skills: string[];
  techStack?: {
    frontend?: string[];
    backend?: string[];
    tools?: string[];
  };
  projectDate: string;
  projectLink?: string;
  githubLink?: string;
  liveLink?: string;
  gallery?: string[];
  results?: string[];
  caseSpecificContent?: {
    type: 'script' | 'social-media' | 'design' | 'code';
    content: string | string[];
  };
};

export type PortfolioCategoryWithProjects = PortfolioCategory & {
  projects: PortfolioProject[];
  subCategories?: ProjectSubCategory[];
};
