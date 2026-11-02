import type { Locale } from "@/i18n/config";
import { site } from "./site";

export interface LegalDoc {
  title: string;
  updated: string;
  sections: readonly { heading: string; body: readonly string[] }[];
}

export type LegalKind = "impressum" | "datenschutz";

// TODO: replace the bracketed values. This is a template, not legal advice — have it checked
// (e.g. by the WKO Impressum generator or a lawyer) before publishing.
const owner = {
  address: "[TODO: Street, postcode, city, Iran]",
  activity: "Software development / frontend engineering (freelance & portfolio)",
};

export const legal: Record<LegalKind, Record<Locale, LegalDoc>> = {
  impressum: {
    en: {
      title: "Legal notice (Impressum)",
      updated: "2026-11",
      sections: [
        { heading: "Site owner", body: [site.name, owner.address, `Email: ${site.email}`] },
        { heading: "Activity", body: [owner.activity] },
        {
          heading: "Content & liability",
          body: [
            "The content of this site is created with care, but no guarantee is given for its accuracy, completeness or timeliness. External links lead to third-party sites whose content I do not control.",
          ],
        },
      ],
    },
    de: {
      title: "Impressum",
      updated: "2026-11",
      sections: [
        { heading: "Seiteninhaber", body: [site.name, owner.address, `E-Mail: ${site.email}`] },
        { heading: "Tätigkeit", body: [owner.activity] },
        {
          heading: "Inhalt & Haftung",
          body: [
            "Die Inhalte dieser Seite werden mit Sorgfalt erstellt; für Richtigkeit, Vollständigkeit und Aktualität wird jedoch keine Gewähr übernommen. Externe Links führen zu Seiten Dritter, auf deren Inhalte ich keinen Einfluss habe.",
          ],
        },
      ],
    },
  },
  datenschutz: {
    en: {
      title: "Privacy policy",
      updated: "2026-11",
      sections: [
        { heading: "Controller", body: [`${site.name}, ${owner.address}, ${site.email}`] },
        {
          heading: "Contact form",
          body: [
            "If you use the contact form, I process your name, email address and message to answer your request (Art. 6(1)(b) and (f) GDPR). The data is not used for any other purpose and not passed on, except to the email delivery provider below.",
            "Data is kept as long as needed to handle your request and for follow-up questions, then deleted.",
          ],
        },
        {
          heading: "Email delivery (Resend)",
          body: [
            "Messages are forwarded to my inbox through Resend, which may process data outside the EU/EEA. Transfers rely on appropriate safeguards such as standard contractual clauses.",
          ],
        },
        {
          heading: "Hosting & server logs",
          body: [
            "[TODO: name your hosting provider and region.] The host may process technical data (IP address, time, requested page) in server logs for security and operation.",
          ],
        },
        {
          heading: "Cookies, fonts & analytics",
          body: [
            "This site sets no tracking cookies and uses no analytics. Fonts are self-hosted, so no data is sent to font providers.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You have the right to access, rectification, erasure, restriction, portability and objection. Contact me by email. You may also complain to the Austrian Data Protection Authority (Datenschutzbehörde, dsb.gv.at).",
          ],
        },
      ],
    },
    de: {
      title: "Datenschutzerklärung",
      updated: "2026-11",
      sections: [
        { heading: "Verantwortlicher", body: [`${site.name}, ${owner.address}, ${site.email}`] },
        {
          heading: "Kontaktformular",
          body: [
            "Wenn du das Kontaktformular nutzt, verarbeite ich Name, E-Mail-Adresse und Nachricht zur Beantwortung deiner Anfrage (Art. 6 Abs. 1 lit. b und f DSGVO). Die Daten werden nicht anderweitig verwendet und nicht weitergegeben, außer an den unten genannten E-Mail-Dienstleister.",
            "Die Daten werden so lange gespeichert, wie es zur Bearbeitung und für Rückfragen nötig ist, und danach gelöscht.",
          ],
        },
        {
          heading: "E-Mail-Versand (Resend)",
          body: [
            "Nachrichten werden über Resend in mein Postfach weitergeleitet; dabei kann eine Verarbeitung außerhalb der EU/des EWR stattfinden. Übermittlungen stützen sich auf geeignete Garantien wie Standardvertragsklauseln.",
          ],
        },
        {
          heading: "Hosting & Server-Logs",
          body: [
            "[TODO: Hosting-Anbieter und Region nennen.] Der Hoster kann technische Daten (IP-Adresse, Zeitpunkt, aufgerufene Seite) in Server-Logs zur Sicherheit und für den Betrieb verarbeiten.",
          ],
        },
        {
          heading: "Cookies, Schriften & Analyse",
          body: [
            "Diese Seite setzt keine Tracking-Cookies und nutzt keine Analyse-Tools. Schriften werden selbst gehostet, es werden also keine Daten an Schriftanbieter gesendet.",
          ],
        },
        {
          heading: "Deine Rechte",
          body: [
            "Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch. Schreib mir dazu eine E-Mail. Beschwerden kannst du auch an die österreichische Datenschutzbehörde (dsb.gv.at) richten.",
          ],
        },
      ],
    },
  },
};
