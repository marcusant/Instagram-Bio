import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const runtime = "edge";
export const alt = site.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Dynamic Open Graph image shown when the link is shared (WhatsApp, IG, etc.). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(120% 90% at 50% -20%, #2a1c52, transparent 60%), #0a0810",
          color: "#f5f6f4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a78bfa", fontWeight: 700, letterSpacing: 2 }}>
          @{site.profile.handle}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1.02,
            marginTop: 16,
            textTransform: "uppercase",
            maxWidth: 900,
          }}
        >
          {site.profile.name}
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#9aa0a6", marginTop: 28, maxWidth: 880 }}>
          {site.profile.bio}
        </div>
      </div>
    ),
    { ...size },
  );
}
