"use client";

import { useState } from "react";
import { ResumeData } from "@/lib/serverData";
import StringListEditor from "./StringListEditor";
import { Input, Textarea, Field } from "./Field";

interface Props {
  initial: ResumeData;
  onSave: (data: ResumeData) => Promise<void>;
  saving: boolean;
}

const SKILL_CATEGORIES = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Database" },
  { key: "devops", label: "DevOps" },
  { key: "tools", label: "Tools" },
];

export default function ResumeEditor({ initial, onSave, saving }: Props) {
  const [data, setData] = useState<ResumeData>(initial);
  const [tab, setTab] = useState<"personal" | "experience" | "education" | "skills" | "etc">("personal");

  const updatePersonal = (key: keyof ResumeData["personal"], val: string) =>
    setData((d) => ({ ...d, personal: { ...d.personal, [key]: val } }));

  const updateExperience = (idx: number, key: string, val: string | string[]) =>
    setData((d) => {
      const next = [...d.experience];
      next[idx] = { ...next[idx], [key]: val };
      return { ...d, experience: next };
    });

  const addExperience = () =>
    setData((d) => ({
      ...d,
      experience: [...d.experience, { company: "", position: "", period: "", description: [] }],
    }));

  const removeExperience = (idx: number) =>
    setData((d) => ({ ...d, experience: d.experience.filter((_, i) => i !== idx) }));

  const updateEducation = (idx: number, key: string, val: string) =>
    setData((d) => {
      const next = [...d.education];
      next[idx] = { ...next[idx], [key]: val };
      return { ...d, education: next };
    });

  const addEducation = () =>
    setData((d) => ({
      ...d,
      education: [...d.education, { school: "", major: "", degree: "", period: "", gpa: "", note: "" }],
    }));

  const removeEducation = (idx: number) =>
    setData((d) => ({ ...d, education: d.education.filter((_, i) => i !== idx) }));

  const updateSkills = (category: string, items: string[]) =>
    setData((d) => ({ ...d, skills: { ...d.skills, [category]: items } }));

  const updateCert = (idx: number, key: string, val: string) =>
    setData((d) => {
      const next = [...d.certifications];
      next[idx] = { ...next[idx], [key]: val };
      return { ...d, certifications: next };
    });

  const addCert = () =>
    setData((d) => ({ ...d, certifications: [...d.certifications, { name: "", issuer: "", date: "" }] }));

  const removeCert = (idx: number) =>
    setData((d) => ({ ...d, certifications: d.certifications.filter((_, i) => i !== idx) }));

  const updateLang = (idx: number, key: string, val: string) =>
    setData((d) => {
      const next = [...d.languages];
      next[idx] = { ...next[idx], [key]: val };
      return { ...d, languages: next };
    });

  const addLang = () =>
    setData((d) => ({ ...d, languages: [...d.languages, { language: "", level: "" }] }));

  const removeLang = (idx: number) =>
    setData((d) => ({ ...d, languages: d.languages.filter((_, i) => i !== idx) }));

  const tabs = [
    { key: "personal", label: "개인정보" },
    { key: "experience", label: "경력" },
    { key: "education", label: "학력" },
    { key: "skills", label: "기술스택" },
    { key: "etc", label: "자격증 · 어학" },
  ] as const;

  return (
    <div>
      {/* Sub-tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              tab === t.key ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Personal */}
      {tab === "personal" && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="이름" value={data.personal.name} onChange={(e) => updatePersonal("name", e.target.value)} placeholder="홍길동" required />
            <Input label="영문 이름" value={data.personal.nameEn} onChange={(e) => updatePersonal("nameEn", e.target.value)} placeholder="Gildong Hong" />
          </div>
          <Input label="직함 / 포지션" value={data.personal.title} onChange={(e) => updatePersonal("title", e.target.value)} placeholder="풀스택 개발자" required />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="이메일" type="email" value={data.personal.email} onChange={(e) => updatePersonal("email", e.target.value)} placeholder="your@email.com" />
            <Input label="전화번호" value={data.personal.phone} onChange={(e) => updatePersonal("phone", e.target.value)} placeholder="010-0000-0000" />
          </div>
          <Input label="거주지" value={data.personal.location} onChange={(e) => updatePersonal("location", e.target.value)} placeholder="서울특별시" />
          <Input label="GitHub URL" value={data.personal.github} onChange={(e) => updatePersonal("github", e.target.value)} placeholder="https://github.com/yourid" />
          <Input label="LinkedIn URL" value={data.personal.linkedin} onChange={(e) => updatePersonal("linkedin", e.target.value)} placeholder="https://linkedin.com/in/yourid" />
          <Input label="웹사이트" value={data.personal.website} onChange={(e) => updatePersonal("website", e.target.value)} placeholder="https://yourwebsite.com" />
          <Textarea label="자기소개 (요약)" rows={4} value={data.personal.summary} onChange={(e) => updatePersonal("summary", e.target.value)} placeholder="간단한 자기소개를 작성하세요." />
        </div>
      )}

      {/* Experience */}
      {tab === "experience" && (
        <div className="space-y-6">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-5 space-y-4 relative">
              <button
                onClick={() => removeExperience(idx)}
                className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors text-xl leading-none"
                title="삭제"
              >
                ×
              </button>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="회사명" value={exp.company} onChange={(e) => updateExperience(idx, "company", e.target.value)} placeholder="(주)테크" />
                <Input label="직책/포지션" value={exp.position} onChange={(e) => updateExperience(idx, "position", e.target.value)} placeholder="시니어 개발자" />
              </div>
              <Input label="기간" value={exp.period} onChange={(e) => updateExperience(idx, "period", e.target.value)} placeholder="2022.01 – 현재" />
              <Field label="주요 업무">
                <StringListEditor
                  items={exp.description}
                  onChange={(val) => updateExperience(idx, "description", val)}
                  placeholder="주요 업무 항목"
                />
              </Field>
            </div>
          ))}
          <button
            onClick={addExperience}
            className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors text-sm font-medium"
          >
            + 경력 추가
          </button>
        </div>
      )}

      {/* Education */}
      {tab === "education" && (
        <div className="space-y-6">
          {data.education.map((edu, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-5 space-y-4 relative">
              <button
                onClick={() => removeEducation(idx)}
                className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors text-xl leading-none"
              >
                ×
              </button>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="학교명" value={edu.school} onChange={(e) => updateEducation(idx, "school", e.target.value)} placeholder="한국대학교" />
                <Input label="전공" value={edu.major} onChange={(e) => updateEducation(idx, "major", e.target.value)} placeholder="컴퓨터공학과" />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <Input label="학위" value={edu.degree} onChange={(e) => updateEducation(idx, "degree", e.target.value)} placeholder="학사" />
                <Input label="기간" value={edu.period} onChange={(e) => updateEducation(idx, "period", e.target.value)} placeholder="2015.03 – 2019.02" />
                <Input label="학점" value={edu.gpa} onChange={(e) => updateEducation(idx, "gpa", e.target.value)} placeholder="3.8 / 4.5" />
              </div>
              <Input label="비고" value={edu.note} onChange={(e) => updateEducation(idx, "note", e.target.value)} placeholder="우등 졸업" />
            </div>
          ))}
          <button
            onClick={addEducation}
            className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors text-sm font-medium"
          >
            + 학력 추가
          </button>
        </div>
      )}

      {/* Skills */}
      {tab === "skills" && (
        <div className="space-y-6">
          {SKILL_CATEGORIES.map(({ key, label }) => (
            <div key={key}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">{label}</h3>
              <StringListEditor
                items={data.skills[key] ?? []}
                onChange={(items) => updateSkills(key, items)}
                placeholder={`${label} 기술 추가`}
                addLabel={`${label} 기술 추가`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Etc: Certifications & Languages */}
      {tab === "etc" && (
        <div className="space-y-8">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">자격증</h3>
            <div className="space-y-3">
              {data.certifications.map((cert, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCert(idx, "name", e.target.value)}
                    placeholder="자격증명"
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCert(idx, "issuer", e.target.value)}
                    placeholder="발급기관"
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) => updateCert(idx, "date", e.target.value)}
                    placeholder="2023.05"
                    className="w-28 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <button onClick={() => removeCert(idx)} className="text-gray-300 hover:text-red-500 text-xl leading-none">×</button>
                </div>
              ))}
              <button onClick={addCert} className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">
                <span className="text-lg leading-none">+</span> 자격증 추가
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">어학</h3>
            <div className="space-y-3">
              {data.languages.map((lang, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={lang.language}
                    onChange={(e) => updateLang(idx, "language", e.target.value)}
                    placeholder="언어"
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <input
                    type="text"
                    value={lang.level}
                    onChange={(e) => updateLang(idx, "level", e.target.value)}
                    placeholder="수준 (예: 업무 가능)"
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <button onClick={() => removeLang(idx)} className="text-gray-300 hover:text-red-500 text-xl leading-none">×</button>
                </div>
              ))}
              <button onClick={addLang} className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">
                <span className="text-lg leading-none">+</span> 어학 추가
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => onSave(data)}
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? "저장 중..." : "저장하기"}
        </button>
      </div>
    </div>
  );
}
