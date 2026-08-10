import { careerData } from "@/data/career";
import PrintButton from "@/components/PrintButton";

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
    {children}
  </span>
);

export const metadata = {
  title: "경력기술서 | 홍길동 포트폴리오",
};

export default function CareerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8 print:hidden">
        <h1 className="text-2xl font-bold text-gray-900">경력기술서</h1>
        <PrintButton label="PDF 저장" />
      </div>

      <div className="space-y-6">
        {careerData.map((project, idx) => (
          <article
            key={project.id}
            className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-10 print:shadow-none print:border-none print:border-t print:border-gray-200 print:rounded-none print:pt-8 ${
              idx > 0 ? "page-break" : ""
            }`}
          >
            {/* Project header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6 pb-6 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{project.title}</h2>
                <p className="text-gray-500 text-sm mt-1">
                  {project.company} · {project.role}
                </p>
              </div>
              <div className="text-sm text-gray-400 sm:text-right shrink-0">
                <div className="font-medium">{project.period}</div>
                <div className="mt-0.5">팀 구성: {project.teamSize}</div>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">프로젝트 개요</h3>
              <p className="text-gray-700 leading-relaxed">{project.overview}</p>
            </div>

            {/* Tech stack */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">기술 스택</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>

            {/* Responsibilities */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">주요 업무</h3>
              <ul className="space-y-1.5">
                {project.responsibilities.map((item, i) => (
                  <li key={i} className="flex gap-2 text-gray-700 text-sm">
                    <span className="text-gray-300 mt-1 shrink-0">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Achievements */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">성과</h3>
              <ul className="space-y-1.5">
                {project.achievements.map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="text-green-500 mt-1 shrink-0">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">문제 해결 경험</h3>
              <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 rounded-lg p-4 border border-gray-100">
                {project.challenges}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
