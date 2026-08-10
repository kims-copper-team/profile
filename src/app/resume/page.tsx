import { getResumeData } from "@/lib/serverData";
import { logVisit } from "@/lib/visitLog";
import PrintButton from "@/components/PrintButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "이력서 | 포트폴리오",
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 pb-2 border-b border-gray-200">
    {children}
  </h2>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
    {children}
  </span>
);

export default async function ResumePage() {
  await logVisit("/resume");
  const { personal, education, experience, skills, certifications, languages } = await getResumeData();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8 print:hidden">
        <h1 className="text-2xl font-bold text-gray-900">이력서</h1>
        <PrintButton label="PDF 저장" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-10 print:shadow-none print:border-none print:p-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10 pb-8 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{personal.name}</h1>
            {personal.nameEn && <p className="text-gray-400 text-sm mt-0.5">{personal.nameEn}</p>}
            <p className="text-lg text-gray-600 font-medium mt-2">{personal.title}</p>
          </div>
          <div className="text-sm text-gray-500 space-y-1 sm:text-right">
            {personal.email && <div><a href={`mailto:${personal.email}`} className="hover:text-gray-900">{personal.email}</a></div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
            {personal.github && <div><a href={personal.github} target="_blank" rel="noreferrer" className="hover:text-gray-900">GitHub</a></div>}
          </div>
        </div>

        {personal.summary && (
          <section className="mb-8">
            <SectionTitle>소개</SectionTitle>
            <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-8">
            <SectionTitle>경력</SectionTitle>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.company}</h3>
                      <p className="text-gray-600 text-sm">{exp.position}</p>
                    </div>
                    <span className="text-sm text-gray-400 shrink-0">{exp.period}</span>
                  </div>
                  <ul className="space-y-1">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-gray-600 text-sm flex gap-2">
                        <span className="text-gray-300 mt-1">·</span>
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
          <section className="mb-8">
            <SectionTitle>기술 스택</SectionTitle>
            <div className="space-y-3">
              {Object.entries(skills).map(([category, items]) => {
                const labels: Record<string, string> = { frontend: "Frontend", backend: "Backend", database: "Database", devops: "DevOps", tools: "Tools" };
                return (
                  <div key={category} className="flex flex-wrap gap-x-3 gap-y-1 items-baseline">
                    <span className="text-xs text-gray-400 w-20 shrink-0">{labels[category] ?? category}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((skill) => <Tag key={skill}>{skill}</Tag>)}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-8">
            <SectionTitle>학력</SectionTitle>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                    <p className="text-sm text-gray-600">
                      {edu.major} · {edu.degree}
                      {edu.gpa && <span className="ml-2 text-gray-400">GPA {edu.gpa}</span>}
                      {edu.note && <span className="ml-2 text-gray-400">({edu.note})</span>}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400 shrink-0">{edu.period}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid sm:grid-cols-2 gap-8">
          {certifications.length > 0 && (
            <section>
              <SectionTitle>자격증</SectionTitle>
              <div className="space-y-2">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <div>
                      <span className="font-medium text-gray-800">{cert.name}</span>
                      <span className="text-gray-400 ml-2">{cert.issuer}</span>
                    </div>
                    <span className="text-gray-400 shrink-0 ml-4">{cert.date}</span>
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
                    <span className="font-medium text-gray-800">{lang.language}</span>
                    <span className="text-gray-500">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
