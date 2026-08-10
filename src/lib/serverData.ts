import fs from "fs";
import path from "path";
import { getSupabaseClient, isSupabaseConfigured } from "./supabase";

export type ResumeData = {
  personal: {
    name: string; nameEn: string; title: string; email: string;
    phone: string; location: string; github: string; linkedin: string;
    website: string; summary: string;
  };
  education: { school: string; major: string; degree: string; period: string; gpa: string; note: string }[];
  experience: { company: string; position: string; period: string; description: string[] }[];
  skills: Record<string, string[]>;
  certifications: { name: string; issuer: string; date: string }[];
  languages: { language: string; level: string }[];
};

export type CareerProject = {
  id: string; title: string; company: string; period: string; role: string;
  teamSize: string; overview: string; techStack: string[];
  responsibilities: string[]; achievements: string[]; challenges: string;
};

const DEFAULT_RESUME: ResumeData = {
  personal: { name: "", nameEn: "", title: "", email: "", phone: "", location: "", github: "", linkedin: "", website: "", summary: "" },
  education: [], experience: [], skills: {}, certifications: [], languages: [],
};

function readLocalJson<T>(filename: string, fallback: T): T {
  try {
    const fp = path.join(process.cwd(), "data", filename);
    if (fs.existsSync(fp)) return JSON.parse(fs.readFileSync(fp, "utf-8")) as T;
  } catch {}
  return fallback;
}

async function getSiteData<T>(key: string, fallback: T): Promise<T> {
  if (!isSupabaseConfigured()) return readLocalJson<T>(`${key}.json`, fallback);

  const db = getSupabaseClient();
  const { data, error } = await db.from("site_data").select("value").eq("key", key).maybeSingle();

  if (error || !data) {
    // Auto-seed from local JSON file on first run
    const localData = readLocalJson<T>(`${key}.json`, fallback);
    await db.from("site_data").upsert({ key, value: localData, updated_at: new Date().toISOString() });
    return localData;
  }

  return data.value as T;
}

async function setSiteData(key: string, value: unknown): Promise<void> {
  if (!isSupabaseConfigured()) {
    const fp = path.join(process.cwd(), "data", `${key}.json`);
    fs.mkdirSync(path.dirname(fp), { recursive: true });
    fs.writeFileSync(fp, JSON.stringify(value, null, 2));
    return;
  }
  const db = getSupabaseClient();
  const { error } = await db.from("site_data").upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}

export async function getResumeData(): Promise<ResumeData> {
  return getSiteData<ResumeData>("resume", DEFAULT_RESUME);
}

export async function getCareerData(): Promise<CareerProject[]> {
  return getSiteData<CareerProject[]>("career", []);
}

export async function saveResumeData(data: ResumeData): Promise<void> {
  return setSiteData("resume", data);
}

export async function saveCareerData(data: CareerProject[]): Promise<void> {
  return setSiteData("career", data);
}
