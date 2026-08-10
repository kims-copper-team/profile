import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

export async function getResumeData(): Promise<ResumeData> {
  const { data } = await supabase.from("site_data").select("value").eq("key", "resume").maybeSingle();
  return (data?.value as ResumeData) ?? {
    personal: { name: "", nameEn: "", title: "", email: "", phone: "", location: "", github: "", linkedin: "", website: "", summary: "" },
    education: [], experience: [], skills: {}, certifications: [], languages: [],
  };
}

export async function getCareerData(): Promise<CareerProject[]> {
  const { data } = await supabase.from("site_data").select("value").eq("key", "career").maybeSingle();
  return (data?.value as CareerProject[]) ?? [];
}

export async function saveResumeData(value: ResumeData): Promise<void> {
  const { error } = await supabase.from("site_data").upsert({ key: "resume", value });
  if (error) throw new Error(error.message);
}

export async function saveCareerData(value: CareerProject[]): Promise<void> {
  const { error } = await supabase.from("site_data").upsert({ key: "career", value });
  if (error) throw new Error(error.message);
}

export async function logVisit(page: string): Promise<void> {
  try {
    await supabase.from("visitor_logs").insert({
      page,
      ua: navigator.userAgent,
      ref: document.referrer,
    });
  } catch { /* ignore */ }
}
