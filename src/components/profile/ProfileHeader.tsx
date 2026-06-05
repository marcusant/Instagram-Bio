import Image from "next/image";
import type { ProfileConfig } from "@/types/site";

/** Avatar + name + handle + bio. The name uses the display (condensed) font. */
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

      <p className="reveal reveal-2 mt-3 max-w-[22rem] text-balance text-sm leading-relaxed text-[var(--text-soft)]">
        {profile.bio}
      </p>
    </header>
  );
}
