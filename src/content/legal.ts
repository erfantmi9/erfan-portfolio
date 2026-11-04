import type { Locale } from "@/i18n/config";
import { site } from "./site";

export interface LegalDoc {
  title: string;
  updated: string;
  sections: readonly { heading: string; body: readonly string[] }[];
}

export type LegalKind = "impressum" | "datenschutz";

// Only confirmed details are published here. City/country and any postal address stay unpublished until
// confirmed (tracked in TODO.md). This text describes how the site works; it is not legal advice.
export const legal: Record<LegalKind, Record<Locale, LegalDoc>> = {
  impressum: {
    en: {
      title: "Legal notice (Impressum)",
      updated: "2026-11",
      sections: [
        { heading: "Site owner", body: [site.name, `Email: ${site.email}`] },
        { heading: "Purpose", body: ["Personal portfolio website."] },
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
        { heading: "Seiteninhaber", body: [site.name, `E-Mail: ${site.email}`] },
        { heading: "Zweck", body: ["Persönliche Portfolio-Website."] },
        {
          heading: "Inhalt & Haftung",
          body: [
            "Die Inhalte dieser Seite werden mit Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität wird jedoch keine Gewähr übernommen. Externe Links führen zu Seiten Dritter, auf deren Inhalte ich keinen Einfluss habe.",
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
        { heading: "Responsible for this site", body: [`${site.name}, ${site.email}`] },
        {
          heading: "Contact form: what is collected",
          body: [
            "When you send the contact form, the following data is transmitted: your name, your email address and your message. A hidden anti-spam field is also sent; it is normally empty.",
            "The data is used only to answer your request. It is not used for marketing and not shared with anyone other than the services named below.",
          ],
        },
        {
          heading: "How it is processed",
          body: [
            "The site's server validates the form and passes the message to the email service Resend (Resend, Inc., USA), which delivers it to my email inbox. Resend may process the data outside the EU/EEA. The message itself is not saved in a database on this site, and its contents are not written to server logs.",
            "To limit abuse, the server keeps your IP address in temporary memory for up to 10 minutes to count requests. It is not saved permanently.",
          ],
        },
        {
          heading: "Storage and retention",
          body: [
            "Your message is kept in my email inbox (Gmail, provided by Google) for as long as needed to handle your request and any follow-up questions, and then deleted. Resend keeps its own records of sent emails according to its privacy policy (resend.com/legal/privacy-policy).",
          ],
        },
        {
          heading: "Hosting",
          body: [
            "This site is hosted by Vercel (Vercel Inc., USA). When you visit a page, Vercel may process technical data such as your IP address, the time of the request and the requested page in server logs for operation and security.",
          ],
        },
        {
          heading: "Cookies, fonts & analytics",
          body: [
            "This site sets no tracking cookies and uses no analytics. Fonts are self-hosted, so no data is sent to font providers.",
          ],
        },
        {
          heading: "Your requests",
          body: [
            "You can contact me by email to see or delete the messages I have received from you.",
          ],
        },
      ],
    },
    de: {
      title: "Datenschutzerklärung",
      updated: "2026-11",
      sections: [
        { heading: "Verantwortlich für diese Seite", body: [`${site.name}, ${site.email}`] },
        {
          heading: "Kontaktformular: welche Daten erfasst werden",
          body: [
            "Wenn Sie das Kontaktformular senden, werden folgende Daten übermittelt: Ihr Name, Ihre E-Mail-Adresse und Ihre Nachricht. Außerdem wird ein verstecktes Anti-Spam-Feld gesendet, das normalerweise leer ist.",
            "Die Daten werden nur zur Beantwortung Ihrer Anfrage verwendet. Sie werden nicht für Werbung genutzt und nur an die unten genannten Dienste weitergegeben.",
          ],
        },
        {
          heading: "Verarbeitung",
          body: [
            "Der Server dieser Seite prüft das Formular und übergibt die Nachricht an den E-Mail-Dienst Resend (Resend, Inc., USA), der sie in mein E-Mail-Postfach zustellt. Resend kann die Daten außerhalb der EU/des EWR verarbeiten. Die Nachricht wird auf dieser Seite nicht in einer Datenbank gespeichert, und ihr Inhalt wird nicht in Server-Logs geschrieben.",
            "Zum Schutz vor Missbrauch hält der Server Ihre IP-Adresse bis zu 10 Minuten im Arbeitsspeicher, um Anfragen zu zählen. Sie wird nicht dauerhaft gespeichert.",
          ],
        },
        {
          heading: "Speicherdauer",
          body: [
            "Ihre Nachricht bleibt in meinem E-Mail-Postfach (Gmail, Anbieter Google), solange es für die Bearbeitung Ihrer Anfrage und für Rückfragen nötig ist, und wird danach gelöscht. Resend speichert eigene Aufzeichnungen über gesendete E-Mails gemäß seiner Datenschutzerklärung (resend.com/legal/privacy-policy).",
          ],
        },
        {
          heading: "Hosting",
          body: [
            "Diese Seite wird von Vercel (Vercel Inc., USA) gehostet. Beim Aufruf einer Seite kann Vercel technische Daten wie IP-Adresse, Zeitpunkt der Anfrage und aufgerufene Seite in Server-Logs für Betrieb und Sicherheit verarbeiten.",
          ],
        },
        {
          heading: "Cookies, Schriften & Analyse",
          body: [
            "Diese Seite setzt keine Tracking-Cookies und nutzt keine Analyse-Tools. Schriften werden selbst gehostet, es werden also keine Daten an Schriftanbieter gesendet.",
          ],
        },
        {
          heading: "Ihre Anfragen",
          body: [
            "Sie können mich per E-Mail kontaktieren, um die von Ihnen erhaltenen Nachrichten einzusehen oder löschen zu lassen.",
          ],
        },
      ],
    },
  },
};
