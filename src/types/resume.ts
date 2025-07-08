export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  photo?: string; // Base64 encoded image or URL
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'creative' | 'professional' | 'minimal' | 'executive';
  layout: 'traditional' | 'sidebar' | 'modern' | 'creative' | 'executive';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
    light: string;
  };
  preview: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export type FunnelStep = 'landing' | 'builder' | 'thankyou';

export interface CoverLetterData {
  companyName: string;
  jobTitle: string;
  hiringManagerName: string;
  jobDescription: string;
  whyInterested: string;
  keyAchievement: string;
}