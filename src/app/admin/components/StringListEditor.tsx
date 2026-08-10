"use client";

interface Props {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}

export default function StringListEditor({ items, onChange, placeholder = "항목 추가", addLabel = "+ 추가" }: Props) {
  const update = (idx: number, val: string) => {
    const next = [...items];
    next[idx] = val;
    onChange(next);
  };

  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));

  const add = () => onChange([...items, ""]);

  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => update(idx, e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => remove(idx)}
            className="px-2 py-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors text-lg leading-none"
            title="삭제"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 px-1"
      >
        <span className="text-lg leading-none">+</span> {addLabel}
      </button>
    </div>
  );
}
