import type { LegalDoc } from "@/content/legal";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <article className="section max-w-3xl pt-32">
      <h1 className="text-4xl font-extrabold tracking-tight text-white">{doc.title}</h1>
      <p className="mt-2 font-mono text-xs text-slate-500">{doc.updated}</p>
      {doc.sections.map((s) => (
        <section key={s.heading} className="mt-8">
          <h2 className="text-xl font-bold text-white">{s.heading}</h2>
          {s.body.map((line) => (
            <p key={line} className="mt-2 leading-relaxed text-slate-400">
              {line}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
}
