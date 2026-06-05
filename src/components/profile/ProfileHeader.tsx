import Image from "next/image";
import type { ProfileConfig } from "@/types/site";

/** Avatar + handle + value pillars (three short phrases under the name). */
export function ProfileHeader({ profile }: { profile: ProfileConfig }) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative">
        {/* Atmospheric accent glow behind the avatar (depth). */}
        <div
          aria-hidden
          className="absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_70%)] blur-2xl"
        />
        <div className="overflow-hidden rounded-full border-2 border-[var(--surface-border)] shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
          <Image
            src={profile.avatar}
            alt={`Foto de ${profile.name}`}
            width={120}
            height={120}
            priority
            className="h-[120px] w-[120px] object-cover"
          />
        </div>
      </div>

      <h1 className="reveal mt-5 text-xl font-semibold tracking-tight text-[var(--text)]">
        @{profile.handle}
      </h1>

      <ul className="reveal reveal-2 mt-3 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm leading-relaxed text-[var(--text-soft)]">
        {profile.pillars.map((pillar, index) => (
          <li
            key={pillar}
            className="flex items-center gap-x-2.5 whitespace-nowrap"
          >
            {index > 0 && (
              <span aria-hidden className="text-[var(--accent)]">
                ·
              </span>
            )}
            {pillar}
          </li>
        ))}
      </ul>
    </header>
  );
}
