import React from 'react';

export function SectionHeading({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10 text-center" data-aos="fade-up">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        {kicker}
      </p>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

export function Tags({ items }: { items: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span key={t} className="tag">
          {t}
        </span>
      ))}
    </div>
  );
}
