"use client";

import { useState } from "react";
import { CareerProject } from "@/lib/supabaseClient";
import StringListEditor from "./StringListEditor";
import { Input, Textarea } from "./Field";

interface Props {
  initial: CareerProject[];
  onSave: (data: CareerProject[]) => Promise<void>;
  saving: boolean;
}

function emptyProject(): CareerProject {
  return {
    id: `proj-${Date.now()}`,
    title: "",
    company: "",
    period: "",
    role: "",
    teamSize: "",
    overview: "",
    techStack: [],
    responsibilities: [],
    achievements: [],
    challenges: "",
  };
}

export default function CareerEditor({ initial, onSave, saving }: Props) {
  const [projects, setProjects] = useState<CareerProject[]>(initial);
  const [openIdx, setOpenIdx] = useState<number | null>(projects.length > 0 ? 0 : null);

  const update = (idx: number, key: keyof CareerProject, val: string | string[]) =>
    setProjects((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [key]: val };
      return next;
    });

  const add = () => {
    setProjects((prev) => [...prev, emptyProject()]);
    setOpenIdx(projects.length);
  };

  const remove = (idx: number) => {
    setProjects((prev) => prev.filter((_, i) => i !== idx));
    setOpenIdx(null);
  };

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...projects];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    setProjects(next);
    setOpenIdx(target);
  };

  return (
    <div>
      <div className="space-y-3">
        {projects.map((proj, idx) => (
          <div key={proj.id} className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Accordion header */}
            <div className="flex items-center gap-2 px-5 py-4 bg-white">
              <div className="flex gap-1">
                <button
                  onClick={() => move(idx, -1)}
                  disabled={idx === 0}
                  className="text-gray-300 hover:text-gray-600 disabled:opacity-30 text-sm px-1"
                  title="위로"
                >
                  ↑
                </button>
                <button
                  onClick={() => move(idx, 1)}
                  disabled={idx === projects.length - 1}
                  className="text-gray-300 hover:text-gray-600 disabled:opacity-30 text-sm px-1"
                  title="아래로"
                >
                  ↓
                </button>
              </div>
              <button
                className="flex-1 text-left"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-mono">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="font-semibold text-gray-900">
                    {proj.title || <span className="text-gray-400 font-normal">프로젝트 제목 없음</span>}
                  </span>
                  {proj.company && <span className="text-sm text-gray-400">{proj.company}</span>}
                </div>
              </button>
              <span className="text-gray-400 text-sm">{proj.period}</span>
              <button
                onClick={() => remove(idx)}
                className="text-gray-300 hover:text-red-500 transition-colors text-xl leading-none ml-2"
                title="삭제"
              >
                ×
              </button>
            </div>

            {/* Accordion body */}
            {openIdx === idx && (
              <div className="border-t border-gray-100 p-5 space-y-5 bg-gray-50">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="프로젝트명" value={proj.title} onChange={(e) => update(idx, "title", e.target.value)} placeholder="서비스 이름" required />
                  <Input label="회사" value={proj.company} onChange={(e) => update(idx, "company", e.target.value)} placeholder="(주)테크" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="기간" value={proj.period} onChange={(e) => update(idx, "period", e.target.value)} placeholder="2023.01 – 2024.06" />
                  <Input label="역할" value={proj.role} onChange={(e) => update(idx, "role", e.target.value)} placeholder="프론트엔드 리드" />
                </div>
                <Input label="팀 구성" value={proj.teamSize} onChange={(e) => update(idx, "teamSize", e.target.value)} placeholder="개발 5명 (FE 2, BE 3)" />
                <Textarea label="프로젝트 개요" rows={3} value={proj.overview} onChange={(e) => update(idx, "overview", e.target.value)} placeholder="서비스 목적과 규모를 간단히 설명하세요." />

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">기술 스택</label>
                  <StringListEditor items={proj.techStack} onChange={(v) => update(idx, "techStack", v)} placeholder="React" addLabel="기술 추가" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">주요 업무</label>
                  <StringListEditor items={proj.responsibilities} onChange={(v) => update(idx, "responsibilities", v)} placeholder="담당한 업무 항목" addLabel="업무 추가" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">성과 / 결과</label>
                  <StringListEditor items={proj.achievements} onChange={(v) => update(idx, "achievements", v)} placeholder="수치로 표현한 성과" addLabel="성과 추가" />
                </div>

                <Textarea
                  label="문제 해결 경험"
                  rows={4}
                  value={proj.challenges}
                  onChange={(e) => update(idx, "challenges", e.target.value)}
                  placeholder="어떤 문제가 있었고 어떻게 해결했는지 서술하세요."
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={add}
        className="mt-4 w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors text-sm font-medium"
      >
        + 프로젝트 추가
      </button>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => onSave(projects)}
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? "저장 중..." : "저장하기"}
        </button>
      </div>
    </div>
  );
}
