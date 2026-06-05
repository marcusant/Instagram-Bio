import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Generated favicon: monogram of the profile initials on the accent color. */
export default function Icon() {
  const initials = site.profile.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#7c5cfc",
          color: "#ffffff",
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: "-1px",
          borderRadius: 14,
        }}
      >
        {initials}
      </div>
    ),
    { ...size },
  );
}
