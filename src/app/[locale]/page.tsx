import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { BeyondWork } from "@/components/BeyondWork";
import { Contact } from "@/components/Contact";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <About dict={dict} />
      <Projects locale={locale} dict={dict} />
      <Experience locale={locale} dict={dict} />
      <BeyondWork dict={dict} />
      <Contact dict={dict} />
    </>
  );
}
