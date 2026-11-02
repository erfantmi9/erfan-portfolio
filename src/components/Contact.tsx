import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";

export function Contact({ dict }: { dict: Dictionary }) {
  const t = dict.contact;
  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="contact-title" className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-5 max-w-md text-lg text-slate-400">{t.intro}</p>
          <p className="mt-6 font-mono text-sm">
            <a className="text-neon hover:underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm dict={dict} />
        </Reveal>
      </div>
    </section>
  );
}
