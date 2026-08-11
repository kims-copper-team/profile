"use client";

import { useEffect, useState } from "react";
import { getResumeData, logVisit, type ResumeData } from "@/lib/supabaseClient";
import PrintButton from "@/components/PrintButton";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 mb-4 pb-2 border-b border-slate-100">
    {children}
  </h2>
);

export default function CVPage() {
  const [data, setData] = useState<ResumeData | null>(null);

  useEffect(() => {
    logVisit("/cv");
    getResumeData().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-5 h-5 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
      </div>
    );
  }

  const { personal, education, experience, skills, certifications, languages } = data;

  return (
    <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <div>
          <h1 className="text-2xl font-black tracking-tight mb-0.5" style={{ letterSpacing: "-0.03em" }}>CV / Resume</h1>
          <p className="text-sm text-slate-500">이력서 · Curriculum Vitae</p>
        </div>
        <PrintButton label="PDF 저장" />
      </div>

      {/* CV Card */}
      <div
        className="rounded-xl shadow-sm print:shadow-none print:border-none"
        style={{ background: "#fff", border: "1px solid #E2E8F4" }}
      >
        {/* Name / Contact header */}
        <div className="p-7 pb-6 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900">{personal.name}</h2>
              {personal.nameEn && (
                <p className="text-xs font-mono text-slate-400 tracking-widest mt-0.5">{personal.nameEn.toUpperCase()}</p>
              )}
              <p className="text-base font-medium text-slate-600 mt-2">{personal.title}</p>
            </div>
            <div className="text-[12px] text-slate-500 space-y-1 sm:text-right font-mono">
              {personal.email && (
                <div><a href={`mailto:${personal.email}`} className="hover:text-slate-800 transition-colors">{personal.email}</a></div>
              )}
              {personal.phone && <div>{personal.phone}</div>}
              {personal.location && <div>{personal.location}</div>}
              {personal.github && (
                <div>
                  <a href={personal.github} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
                    {personal.github.replace("https://", "")}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-7 space-y-7">
          {personal.summary && (
            <section>
              <SectionTitle>소개</SectionTitle>
              <p className="text-sm text-slate-600 leading-relaxed">{personal.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <SectionTitle>경력</SectionTitle>
              <div className="space-y-5">
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <div>
                        <h3 className="font-bold text-[14px] text-slate-800">{exp.company}</h3>
                        <p className="text-sm text-slate-500">{exp.position}</p>
                      </div>
                      <span className="text-[12px] font-mono text-slate-400 shrink-0">{exp.period}</span>
                    </div>
                    <ul className="space-y-1">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-slate-600">
                          <span className="text-slate-300 mt-0.5 shrink-0">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {Object.keys(skills).length > 0 && (
            <section>
              <SectionTitle>기술</SectionTitle>
              <div className="space-y-2">
                {Object.entries(skills).map(([cat, items]) => (
                  <div key={cat} className="flex flex-wrap gap-x-4 gap-y-1 items-baseline">
                    <span className="text-[11px] font-semibold text-slate-400 w-24 shrink-0">{cat}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((s) => (
                        <span
                          key={s}
                          className="text-[11px] px-2 py-0.5 rounded font-medium"
                          style={{ background: "#F1F5F9", color: "#475569" }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <SectionTitle>학력</SectionTitle>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                    <div>
                      <h3 className="font-bold text-[14px] text-slate-800">{edu.school}</h3>
                      <p className="text-sm text-slate-500">
                        {edu.major} · {edu.degree}
                        {edu.gpa && <span className="ml-2 text-slate-400">GPA {edu.gpa}</span>}
                        {edu.note && <span className="ml-2 text-slate-400">({edu.note})</span>}
                      </p>
                    </div>
                    <span className="text-[12px] font-mono text-slate-400 shrink-0">{edu.period}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid sm:grid-cols-2 gap-7">
            {certifications.length > 0 && (
              <section>
                <SectionTitle>자격증</SectionTitle>
                <div className="space-y-2">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <div>
                        <span className="font-medium text-slate-800">{cert.name}</span>
                        <span className="text-slate-400 ml-2 text-[11px]">{cert.issuer}</span>
                      </div>
                      <span className="text-slate-400 font-mono text-[11px] shrink-0 ml-4">{cert.date}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {languages.length > 0 && (
              <section>
                <SectionTitle>어학</SectionTitle>
                <div className="space-y-2">
                  {languages.map((lang, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="font-medium text-slate-800">{lang.language}</span>
                      <span className="text-slate-500 font-mono text-[11px]">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
