import { Container } from "@/components/ui/Container";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { SocialBar } from "@/components/social/SocialBar";
import { LinkList } from "@/components/links/LinkList";
import { SubscribeDialog } from "@/components/subscribe/SubscribeDialog";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { site, activeLinks } from "@/config/site";

export default function Page() {
  return (
    <>
      {site.theme.allowToggle && <ThemeToggle />}

      <main className="flex min-h-dvh flex-col items-center py-14 sm:py-16">
        <Container>
          <ProfileHeader profile={site.profile} />
          <SocialBar socials={site.socials} />
          <LinkList links={activeLinks} />
          {site.subscribe.enabled && <SubscribeDialog config={site.subscribe} />}
        </Container>

        <footer className="mt-12 text-center text-xs text-[var(--text-muted)]">
          <p>
            © {new Date().getFullYear()} {site.profile.name}
          </p>
        </footer>
      </main>
    </>
  );
}
