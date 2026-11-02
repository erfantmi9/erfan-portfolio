import { ImageResponse } from "next/og";
import { isLocale, defaultLocale } from "@/i18n/config";
import { site } from "@/content/site";

export const alt = "Erfan Teymuri — Frontend Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : defaultLocale;
  const tagline =
    lang === "de" ? "Performante, KI-native Oberflächen" : "High-performance, AI-native interfaces";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #09090b 0%, #0f172a 100%)",
          color: "#e2e8f0",
        }}
      >
        <div style={{ fontSize: 28, color: "#34d399", fontFamily: "monospace" }}>~/portfolio $ whoami</div>
        <div style={{ fontSize: 88, fontWeight: 800, marginTop: 24, color: "#ffffff" }}>{site.name}</div>
        <div style={{ fontSize: 40, marginTop: 16, color: "#94a3b8" }}>Frontend Software Engineer</div>
        <div style={{ fontSize: 30, marginTop: 40, color: "#fbbf24" }}>{tagline}</div>
      </div>
    ),
    size,
  );
}
