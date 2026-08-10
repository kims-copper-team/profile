import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export type ResumeData = {
  personal: {
    name: string;
    nameEn: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    website: string;
    summary: string;
  };
  education: { school: string; major: string; degree: string; period: string; gpa: string; note: string }[];
  experience: { company: string; position: string; period: string; description: string[] }[];
  skills: Record<string, string[]>;
  certifications: { name: string; issuer: string; date: string }[];
  languages: { language: string; level: string }[];
};

export type CareerProject = {
  id: string;
  title: string;
  company: string;
  period: string;
  role: string;
  teamSize: string;
  overview: string;
  techStack: string[];
  responsibilities: string[];
  achievements: string[];
  challenges: string;
};

function readJson<T>(filename: string, fallback: T): T {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch {
    return fallback;
  }
}

export function getResumeData(): ResumeData {
  return readJson<ResumeData>("resume.json", {
    personal: { name: "", nameEn: "", title: "", email: "", phone: "", location: "", github: "", linkedin: "", website: "", summary: "" },
    education: [],
    experience: [],
    skills: {},
    certifications: [],
    languages: [],
  });
}

export function getCareerData(): CareerProject[] {
  return readJson<CareerProject[]>("career.json", []);
}

export function saveResumeData(data: ResumeData): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(path.join(DATA_DIR, "resume.json"), JSON.stringify(data, null, 2));
}

export function saveCareerData(data: CareerProject[]): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(path.join(DATA_DIR, "career.json"), JSON.stringify(data, null, 2));
}
